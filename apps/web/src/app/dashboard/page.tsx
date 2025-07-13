"use client";
import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@packages/backend/convex/_generated/api";
import { Dialog } from "@headlessui/react";

// Fix for TypeScript: declare window.google for Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

function loadGoogleMapsScript(apiKey: string) {
  if (typeof window === "undefined" || window.google?.maps) return;
  if (document.getElementById("google-maps-script")) return;
  const script = document.createElement("script");
  script.id = "google-maps-script";
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  document.body.appendChild(script);
}

export default function DashboardPage() {
  const [googleMapsKey, setGoogleMapsKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [places, setPlaces] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [autocomplete, setAutocomplete] = useState<any[]>([]);
  const [chat, setChat] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userGoals, setUserGoals] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user, isSignedIn } = useUser();
  const userId = user?.id;
  const saveMemory = useMutation(api.memories.saveMemory);
  const memories = useQuery(api.memories.getMemories, userId ? { userId } : "skip");
  const [memoriesOpen, setMemoriesOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<any | null>(null);
  const deleteMemory = useMutation(api.memories.deleteMemory);
  const editMemory = useMutation(api.memories.editMemory);

  // Editing state
  const [editing, setEditing] = useState(false);
  const [editPlaces, setEditPlaces] = useState<any[]>([]);
  const [editChat, setEditChat] = useState<any[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Restore a memory to today
  function handleRestore() {
    if (!selectedMemory) return;
    setPlaces(selectedMemory.places);
    setChat(selectedMemory.chat);
    setMemoriesOpen(false);
  }

  // Calculate summary
  const totalMemories = memories?.length || 0;
  // Streak: count consecutive days with memories, starting from today
  function calcStreak() {
    if (!memories || memories.length === 0) return 0;
    let streak = 0;
    let d = new Date();
    for (let i = 0; i < memories.length; i++) {
      const memDate = memories[i].date;
      const dStr = d.toISOString().slice(0, 10);
      if (memDate === dStr) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }
  // Most visited place (by name)
  function calcMostVisited() {
    if (!memories) return null;
    const count: Record<string, number> = {};
    for (const mem of memories) {
      for (const p of mem.places) {
        if (p.name) count[p.name] = (count[p.name] || 0) + 1;
      }
    }
    let max = 0, maxName = null;
    for (const k in count) {
      if (count[k] > max) { max = count[k]; maxName = k; }
    }
    return maxName;
  }
  const streak = calcStreak();
  const mostVisited = calcMostVisited();

  // Load Google Maps JS SDK when API key is entered
  useEffect(() => {
    if (googleMapsKey) {
      loadGoogleMapsScript(googleMapsKey);
    }
  }, [googleMapsKey]);

  // Google Places Autocomplete using JS SDK
  useEffect(() => {
    if (!input || !googleMapsKey || !window.google?.maps?.places) {
      setAutocomplete([]);
      return;
    }
    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input }, (predictions: google.maps.places.AutocompletePrediction[] | null) => {
      setAutocomplete(predictions || []);
    });
  }, [input, googleMapsKey]);

  // Add place to today's list (fetch details via JS SDK)
  async function addPlace(place: any) {
    if (!googleMapsKey || !window.google?.maps?.places) return;
    const service = new window.google.maps.places.PlacesService(document.createElement("div"));
    service.getDetails({ placeId: place.place_id }, (details: any, status: any) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlaces((prev) => [
          ...prev,
          {
            name: details.name,
            address: details.formatted_address,
            time: new Date().toLocaleTimeString(),
            place_id: place.place_id,
          },
        ]);
        setInput("");
        setAutocomplete([]);
      }
    });
  }

  function removePlace(idx: number) {
    setPlaces((prev) => prev.filter((_, i) => i !== idx));
  }

  // AI Chatbot
  async function sendChat(userMessage?: string) {
    if (!openaiKey) return;
    setLoading(true);
    const userMsg = userMessage || chatInput;
    setChat((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatInput("");

    // If userGoals is not set, treat this as the goals input
    let goals = userGoals;
    let aiPrompt = "";
    if (!userGoals) {
      setUserGoals(userMsg);
      goals = userMsg;
      aiPrompt = `Thank you for sharing your health goals: "${userMsg}".\nHere are the places I visited today: ${places
        .map((p) => `${p.name} (${p.address})`)
        .join(", ")}.\n\nPlease:\n- Analyze each place for how it might help or hinder my goals.\n- Give specific, actionable feedback for each place.\n- Suggest healthy alternatives or habits I could try next time.\n- Summarize your overall feedback in 2-3 sentences.\n- Give me one simple, motivating challenge for tomorrow.`;
    } else {
      aiPrompt = `My health goal is: ${userGoals}.\nToday I went to these places: ${places
        .map((p) => `${p.name} (${p.address})`)
        .join(", ")}.\n\nPlease answer my question in detail, referencing my goals and places: "${userMsg}"\n\nIf relevant, include:\n- Specific advice for nutrition, activity, or mental health.\n- Suggestions for improvement or alternatives.\n- A brief summary and a next step I can take.`;
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are Vitalize, an expert AI health coach with a background in nutrition, exercise science, and behavioral psychology. Your job is to help users achieve their health goals by giving highly personalized, evidence-based, and actionable feedback. Always use a positive, supportive, and non-judgmental tone.\n\nWhen responding:\n- Reference the user's stated health goals and the specific places they visited today.\n- Analyze each place for its potential impact on their goals (e.g., healthy/unhealthy food options, opportunities for physical activity, mental wellness, etc.).\n- Give detailed, practical suggestions for improvement, including what the user could do differently next time.\n- If possible, suggest healthy alternatives or habits based on the user's routine.\n- Summarize your feedback in a clear, encouraging way, and offer a simple next step or challenge for tomorrow.\n- If the user asks a question, answer it with scientific accuracy, referencing their goals and places.\n- Avoid generic advice; always tailor your response to the user's unique context.`
          },
          ...chat.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: aiPrompt },
        ],
        max_tokens: 200,
      }),
    });
    const data = await res.json();
    const aiMsg = data.choices?.[0]?.message?.content || "(No response)";
    setChat((prev) => [...prev, { role: "assistant", content: aiMsg }]);
    setLoading(false);
  }

  // When userGoals is set and places change, have the AI glance and give feedback
  useEffect(() => {
    if (userGoals && places.length > 0 && chat.length > 0) {
      // Only auto-feedback if last message is not already a feedback
      const lastUser = chat.filter((m) => m.role === "user").slice(-1)[0];
      if (lastUser && lastUser.content === userGoals) {
        sendChat();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  // Save memory on places or chat change
  useEffect(() => {
    if (!userId || !openaiKey || !googleMapsKey) return;
    if (places.length === 0 && chat.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    saveMemory({ userId, date: today, places, chat });
  }, [places, chat, userId, openaiKey, googleMapsKey]);

  const keysMissing = !googleMapsKey || !openaiKey;

  return (
    <>
      <Header
        googleMapsKey={googleMapsKey}
        setGoogleMapsKey={setGoogleMapsKey}
        openaiKey={openaiKey}
        setOpenaiKey={setOpenaiKey}
      />
      {/* Memories Modal remains here */}
      <Dialog open={memoriesOpen} onClose={() => { setMemoriesOpen(false); setEditing(false); setDeleteConfirm(false); }} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white/90 backdrop-blur-lg p-6 shadow-xl border border-gray-100">
            <Dialog.Title className="text-xl font-semibold mb-4 text-[#0D87E1]">My Memories</Dialog.Title>
            {/* Summary */}
            <div className="mb-4 flex gap-8 text-xs text-gray-700">
              <div><span className="font-bold">Total:</span> {totalMemories}</div>
              <div><span className="font-bold">Streak:</span> {streak} day{streak === 1 ? '' : 's'}</div>
              <div><span className="font-bold">Most visited:</span> {mostVisited || '—'}</div>
            </div>
            <div className="flex gap-6">
              <div className="w-1/3 border-r border-gray-200 pr-4 max-h-96 overflow-y-auto">
                <div className="text-xs text-gray-500 mb-2">Select a date:</div>
                <ul className="space-y-1">
                  {memories?.map((mem: any) => (
                    <li key={mem._id}>
                      <button
                        className={`w-full text-left px-2 py-1 rounded hover:bg-[#0D87E1]/10 text-sm ${selectedMemory?._id === mem._id ? "bg-[#0D87E1]/10 font-semibold" : ""}`}
                        onClick={() => { setSelectedMemory(mem); setEditing(false); setDeleteConfirm(false); }}
                      >
                        {mem.date}
                      </button>
                    </li>
                  ))}
                  {(!memories || memories.length === 0) && (
                    <li className="text-gray-400 text-xs">No memories yet.</li>
                  )}
                </ul>
              </div>
              <div className="flex-1 pl-4 max-h-96 overflow-y-auto">
                {selectedMemory ? (
                  <>
                    {/* Action buttons */}
                    <div className="flex gap-2 mb-2">
                      <button className="px-3 py-1 rounded bg-[#0D87E1] text-white text-xs hover:bg-[#0B6FC2]" onClick={handleRestore}>Restore</button>
                      <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs hover:bg-gray-300" onClick={() => { setEditing(!editing); setEditPlaces(selectedMemory.places); setEditChat(selectedMemory.chat); }}>Edit</button>
                      <button className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600" onClick={() => setDeleteConfirm(true)}>Delete</button>
                    </div>
                    {/* Delete confirmation */}
                    {deleteConfirm && (
                      <div className="mb-2 flex items-center gap-2 text-xs text-red-600">
                        Are you sure? This cannot be undone.
                        <button className="px-2 py-0.5 rounded bg-red-500 text-white hover:bg-red-700" onClick={async () => { await deleteMemory({ memoryId: selectedMemory._id }); setSelectedMemory(null); setDeleteConfirm(false); }}>Delete</button>
                        <button className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => setDeleteConfirm(false)}>Cancel</button>
                      </div>
                    )}
                    {/* Edit mode */}
                    {editing ? (
                      <>
                        <div className="mb-2 text-sm text-gray-700 font-semibold">Places:</div>
                        <ul className="mb-4 space-y-2">
                          {editPlaces.map((place: any, idx: number) => (
                            <li key={place.place_id || idx} className="bg-white/70 rounded px-3 py-2 text-xs text-gray-700 border border-gray-100 shadow-sm flex items-center gap-2">
                              <input className="flex-1 bg-transparent border-none outline-none text-xs" value={place.name} onChange={e => { const arr = [...editPlaces]; arr[idx] = { ...arr[idx], name: e.target.value }; setEditPlaces(arr); }} />
                              <input className="flex-1 bg-transparent border-none outline-none text-xs" value={place.address} onChange={e => { const arr = [...editPlaces]; arr[idx] = { ...arr[idx], address: e.target.value }; setEditPlaces(arr); }} />
                              <button className="text-red-400 text-xs" onClick={() => { setEditPlaces(editPlaces.filter((_: any, i: number) => i !== idx)); }}>×</button>
                            </li>
                          ))}
                          <li>
                            <button className="text-xs text-[#0D87E1]" onClick={() => setEditPlaces([...editPlaces, { name: "", address: "" }])}>+ Add Place</button>
                          </li>
                        </ul>
                        <div className="mb-2 text-sm text-gray-700 font-semibold">Chat:</div>
                        <div className="space-y-2">
                          {editChat.map((msg: any, i: number) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-center gap-2`}>
                              <input className={`rounded-xl px-4 py-2 max-w-xs shadow font-normal text-xs transition-all whitespace-pre-line flex-1 bg-transparent border border-gray-200`} value={msg.content} onChange={e => { const arr = [...editChat]; arr[i] = { ...arr[i], content: e.target.value }; setEditChat(arr); }} />
                              <button className="text-red-400 text-xs" onClick={() => setEditChat(editChat.filter((_: any, j: number) => j !== i))}>×</button>
                            </div>
                          ))}
                          <div>
                            <button className="text-xs text-[#0D87E1]" onClick={() => setEditChat([...editChat, { role: "user", content: "" }])}>+ Add User Msg</button>
                            <button className="ml-2 text-xs text-[#0D87E1]" onClick={() => setEditChat([...editChat, { role: "assistant", content: "" }])}>+ Add AI Msg</button>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="px-3 py-1 rounded bg-[#0D87E1] text-white text-xs hover:bg-[#0B6FC2]" onClick={async () => { await editMemory({ memoryId: selectedMemory._id, places: editPlaces, chat: editChat }); setEditing(false); }}>Save</button>
                          <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-xs hover:bg-gray-300" onClick={() => setEditing(false)}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-2 text-sm text-gray-700 font-semibold">Places:</div>
                        <ul className="mb-4 space-y-2">
                          {selectedMemory.places.map((place: any, idx: number) => (
                            <li key={place.place_id || idx} className="bg-white/70 rounded px-3 py-2 text-xs text-gray-700 border border-gray-100 shadow-sm">
                              <div className="font-medium text-[#0D87E1]">{place.name}</div>
                              <div className="text-gray-500">{place.address}</div>
                            </li>
                          ))}
                          {selectedMemory.places.length === 0 && <li className="text-gray-400">No places</li>}
                        </ul>
                        <div className="mb-2 text-sm text-gray-700 font-semibold">Chat:</div>
                        <div className="space-y-2">
                          {selectedMemory.chat.map((msg: any, i: number) => (
                            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                              <div className={`rounded-xl px-4 py-2 max-w-xs shadow ${msg.role === "user" ? "bg-[#0D87E1]/90 text-white" : "bg-[#E6F0FA] text-[#2D1A47]"} font-normal text-xs transition-all whitespace-pre-line`}>
                                {msg.content}
                              </div>
                            </div>
                          ))}
                          {selectedMemory.chat.length === 0 && <div className="text-gray-400">No chat</div>}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-gray-400 text-sm">Select a date to view your memory.</div>
                )}
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button className="px-4 py-2 rounded bg-[#0D87E1] text-white text-sm hover:bg-[#0B6FC2]" onClick={() => { setMemoriesOpen(false); setEditing(false); setDeleteConfirm(false); }}>Close</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      <main className="min-h-screen pt-32 pb-32 bg-gradient-to-br from-[#A259FF] to-[#BFFF3C] flex flex-col items-center px-2 md:px-4 py-16 md:py-32">
        {/* Dashboard Card */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-5xl mx-auto rounded-3xl shadow-xl bg-white/95 backdrop-blur-xl p-0 flex flex-col md:flex-row overflow-hidden border border-gray-100 min-h-[520px] mt-16">
          <div className="absolute w-full flex justify-end pt-8 pr-8 z-10 pointer-events-none">
            {isSignedIn && (
              <button
                className="bg-[#0D87E1] text-white font-heading px-5 py-2 rounded-lg shadow hover:bg-[#0B6FC2] transition pointer-events-auto !text-white"
                onClick={() => setMemoriesOpen(true)}
              >
                My Memories
              </button>
            )}
          </div>
          {/* Left: Places Visited Today */}
          <div className="md:w-1/2 w-full p-8 bg-white/60 backdrop-blur-lg flex flex-col gap-8 min-h-[520px] border-r border-white/30">
            <h2 className="text-2xl font-semibold mb-1 text-[#0D87E1] tracking-tight">Places You Went Today</h2>
            {keysMissing && (
              <div className="mb-2 text-[#A259FF] text-sm font-normal bg-[#A259FF]/10 rounded-lg px-3 py-2">Please enter both API keys above to use the dashboard features.</div>
            )}
            <div className="mb-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                placeholder="Search or paste a Google Maps location..."
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-base focus:ring-2 focus:ring-[#A259FF] bg-white placeholder:text-gray-400 shadow-sm transition-all focus:shadow-md"
                disabled={keysMissing}
              />
              {autocomplete.length > 0 && !keysMissing && (
                <ul className="absolute left-0 right-0 bg-white border border-gray-100 rounded-lg mt-2 max-h-44 overflow-y-auto shadow-lg z-10">
                  {autocomplete.map((place) => (
                    <li
                      key={place.place_id}
                      className="px-4 py-2 hover:bg-[#A259FF]/10 cursor-pointer transition-colors text-[#2D1A47] text-sm"
                      onClick={() => addPlace(place)}
                    >
                      {place.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="space-y-3">
              {places.map((place, idx) => (
                <li key={place.place_id} className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow border border-gray-100">
                  <div>
                    <div className="font-medium text-[#0D87E1] text-base">{place.name}</div>
                    <div className="text-gray-500 text-xs font-normal">{place.address}</div>
                    <div className="text-xs text-gray-300 mt-1">Added at {place.time}</div>
                  </div>
                  <button
                    className="ml-4 text-[#A259FF] hover:text-[#0D87E1] font-normal text-xl rounded-full w-8 h-8 flex items-center justify-center bg-white shadow hover:bg-[#A259FF]/10 transition-all"
                    onClick={() => removePlace(idx)}
                    aria-label="Remove place"
                  >
                    ×
                  </button>
                </li>
              ))}
              {places.length === 0 && !keysMissing && (
                <li className="text-gray-300 text-center py-6 font-normal text-sm">No places added yet. Start by searching above!</li>
              )}
            </ul>
          </div>
          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-100" />
          {/* Right: AI Health Coach Chatbot */}
          <div className="md:w-1/2 w-full p-8 bg-white/60 backdrop-blur-lg flex flex-col gap-8 justify-between min-h-[520px]">
            <h2 className="text-2xl font-semibold mb-1 text-[#A259FF] tracking-tight">AI Health Coach</h2>
            {keysMissing && (
              <div className="mb-2 text-[#A259FF] text-sm font-normal bg-[#A259FF]/10 rounded-lg px-3 py-2">Please enter both API keys above to use the chatbot.</div>
            )}
            <div className="flex-1 flex flex-col mb-2 overflow-y-auto max-h-80 rounded-lg bg-white p-3 shadow-inner border border-gray-100 gap-1">
              {chat.length === 0 && !keysMissing && (
                <div className="text-gray-300 text-center my-6 font-normal text-sm">Ask for feedback or enter your health goals to get started.</div>
              )}
              {chat.map((msg, i) => (
                <div key={i} className={`mb-1 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`rounded-xl px-4 py-2 max-w-xs shadow ${msg.role === "user" ? "bg-[#0D87E1]/90 text-white" : "bg-[#E6F0FA] text-[#2D1A47]"} font-normal text-sm transition-all whitespace-pre-line`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-gray-300 text-center">AI is thinking...</div>}
              <div ref={chatEndRef} />
            </div>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={userGoals ? "Ask a question about your choices..." : "Enter your health goals..."}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-base focus:ring-2 focus:ring-[#A259FF] bg-white placeholder:text-gray-400 shadow-sm transition-all focus:shadow-md min-h-[40px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && chatInput.trim() && !keysMissing) sendChat();
                }}
                disabled={keysMissing}
                style={{ minHeight: 40 }}
              />
              <button
                className="bg-[#0D87E1] hover:bg-[#0B6FC2] text-white font-medium rounded-lg px-6 py-2 transition-all shadow text-base min-h-[40px]"
                onClick={() => sendChat()}
                disabled={loading || !chatInput.trim() || keysMissing}
                style={{ minHeight: 40 }}
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
} 