import { useState, FormEvent } from "react";
import { SAMPLE_SCENARIOS } from "./data/samples";
import { InterpretationResponse } from "./types";
import { 
  MessageSquare, 
  Users, 
  Target, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  ShieldAlert, 
  Loader2, 
  Sparkles,
  RefreshCw,
  Eye,
  BookOpen,
  Info
} from "lucide-react";

export default function App() {
  // Use the first sample as the default pre-loaded state
  const defaultSampleKey = "行けたら行く";
  const defaultSample = SAMPLE_SCENARIOS[defaultSampleKey];

  const [message, setMessage] = useState<string>(defaultSample.message);
  const [relationship, setRelationship] = useState<string>(defaultSample.relationship);
  const [context, setContext] = useState<string>(defaultSample.context);
  const [goal, setGoal] = useState<string>(defaultSample.goal);

  const [result, setResult] = useState<InterpretationResponse | null>(defaultSample.presetResponse);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle custom analysis
  const handleAnalyze = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim()) {
      setError("Please enter a Japanese message to interpret.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/interpret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          relationship,
          context,
          goal,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to analyze message.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "An unexpected error occurred. Please verify your GEMINI_API_KEY is configured in the Secrets panel."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Function to load a pre-populated scenario
  const handleLoadSample = (key: string) => {
    const sample = SAMPLE_SCENARIOS[key];
    if (sample) {
      setMessage(sample.message);
      setRelationship(sample.relationship);
      setContext(sample.context);
      setGoal(sample.goal);
      setResult(sample.presetResponse);
      setError(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col font-sans text-[#434338] antialiased">
      {/* Privacy Warning Banner */}
      <div id="privacy-banner" className="bg-[#efede4] border-b border-[#e1ded0] py-2 px-4 text-center text-xs uppercase tracking-[0.08em] text-[#7a7a6a] font-semibold flex items-center justify-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#8a8a7a]" />
        <span>Please remove names and personal details before using this tool. We do not store your messages.</span>
      </div>

      {/* Header */}
      <header id="app-header" className="max-w-7xl w-full mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-serif italic text-[#5a5a40] tracking-tight font-bold">HonneAgent</h1>
            <span className="bg-[#5a5a40]/10 text-[#5a5a40] text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">Uncertainty-Aware</span>
          </div>
          <p className="text-xs text-[#8a8a7a] uppercase tracking-wider mt-1">Interpreting ambiguous Japanese messages or translated English expressions</p>
        </div>
        <div className="flex gap-5 text-xs font-semibold uppercase tracking-widest text-[#8a8a7a] mt-2 sm:mt-0">
          <span className="hover:text-[#5a5a40] cursor-pointer transition-colors">Philosophy</span>
          <span className="hover:text-[#5a5a40] cursor-pointer transition-colors">Ethics</span>
          <span className="hover:text-[#5a5a40] cursor-pointer transition-colors">Privacy</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 md:px-8 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Input Panel & Preset Samples */}
        <section className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Input Panel Card */}
          <div id="input-card" className="bg-white rounded-2xl p-6 border border-[#ece9df] shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#f3f1e9]">
              <MessageSquare className="w-5 h-5 text-[#8a8a7a]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#8a8a7a]">Input Panel</h2>
            </div>

            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a7a] block mb-1.5">
                  Message (Japanese or Translated English)
                </label>
                <textarea
                  id="message-input"
                  className="w-full h-28 bg-[#f9f8f3] border border-[#e8e6dc] rounded-xl p-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#5a5a40] focus:border-[#5a5a40] resize-none placeholder-[#c4c2b5] transition-all"
                  placeholder="e.g., 「行けたら行く」 or &quot;I'll go if I can make it&quot;, &quot;Maybe next time&quot;..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <p className="text-[10px] text-[#8a8a7a] mt-1.5 leading-relaxed">
                  💡 <strong>Tip:</strong> Japanese speakers often directly translate indirect polite phrases into English. You can analyze those English phrases here!
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a7a] block mb-1.5">
                  Context <span className="text-[10px] text-[#b4b2a3] font-normal">(Optional but recommended)</span>
                </label>
                <textarea
                  id="context-input"
                  className="w-full h-20 bg-[#f9f8f3] border border-[#e8e6dc] rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#5a5a40] focus:border-[#5a5a40] resize-none placeholder-[#c4c2b5] transition-all"
                  placeholder="e.g., Invited them to study after class, they replied within 5 minutes..."
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a7a] block mb-1.5">
                    Relationship
                  </label>
                  <div className="relative">
                    <select
                      id="relationship-select"
                      className="w-full bg-[#f9f8f3] border border-[#e8e6dc] rounded-xl p-2.5 text-xs text-[#434338] focus:outline-none focus:ring-1 focus:ring-[#5a5a40] focus:border-[#5a5a40] appearance-none cursor-pointer"
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                    >
                      <option value="friend">Friend</option>
                      <option value="coworker">Coworker</option>
                      <option value="classmate">Classmate</option>
                      <option value="lab member">Lab Member</option>
                      <option value="language exchange partner">Language Exchange Partner</option>
                      <option value="club member">Club Member</option>
                      <option value="boundary-sensitive follow-up">Boundary-Sensitive Follow-up</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8a8a7a]">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#8a8a7a] block mb-1.5">
                    Your Goal
                  </label>
                  <div className="relative">
                    <select
                      id="goal-select"
                      className="w-full bg-[#f9f8f3] border border-[#e8e6dc] rounded-xl p-2.5 text-xs text-[#434338] focus:outline-none focus:ring-1 focus:ring-[#5a5a40] focus:border-[#5a5a40] appearance-none cursor-pointer"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      <option value="understand">Understand Nuance</option>
                      <option value="reply politely">Reply Politely</option>
                      <option value="decide whether to follow up">Decide Follow-up</option>
                      <option value="reduce misunderstanding">Reduce Misunderstanding</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8a8a7a]">
                      <Target className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              <button
                id="analyze-button"
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full bg-[#5a5a40] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#4a4a35] transition-all shadow-sm flex items-center justify-center gap-2 disabled:bg-[#a3a38f] disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Nuances...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sample Scenarios */}
          <div id="samples-card" className="bg-[#f1f0e8] rounded-2xl p-5 border border-[#e1ded0]">
            <p className="text-[11px] font-bold uppercase text-[#7a7a6a] mb-3 tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sample Scenarios</span>
            </p>
            <div className="flex flex-col gap-2">
              {Object.keys(SAMPLE_SCENARIOS).map((key) => {
                const isSelected = message === SAMPLE_SCENARIOS[key].message;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleLoadSample(key)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all flex justify-between items-center border ${
                      isSelected
                        ? "bg-[#5a5a40] text-white border-transparent font-medium"
                        : "bg-white text-[#434338] border-[#ece9df] hover:border-[#5a5a40]/50"
                    }`}
                  >
                    <span className="font-mono">「{key}」</span>
                    <span className={`text-[10px] ${isSelected ? "text-white/80" : "text-[#8a8a7a]"}`}>
                      {SAMPLE_SCENARIOS[key].relationship}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-[#8a8a7a] mt-3 leading-relaxed">
              Click any scenario to instantly load analyzed data, or edit details and click "Analyze Message" to query the live Gemini model.
            </p>
          </div>
        </section>

        {/* Right Column: Results Dashboard */}
        <section className="lg:col-span-8 flex flex-col gap-6 w-full">
          
          {error && (
            <div className="bg-[#fcf5f5] border border-[#f5dcdc] text-[#a84c4c] p-4 rounded-xl text-xs leading-relaxed flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Analysis Failed</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="bg-white border border-[#ece9df] rounded-2xl p-12 flex flex-col items-center justify-center text-center gap-4">
              <Loader2 className="w-8 h-8 text-[#5a5a40] animate-spin" />
              <div>
                <p className="font-serif italic text-lg text-[#5a5a40]">Refining interpretations...</p>
                <p className="text-xs text-[#8a8a7a] mt-1 max-w-sm">
                  Consulting HonneAgent rules to ensure uncertainty-aware, respectful, and safe perspective mapping.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Do Not Over-Assume Warning Banner */}
              <div className="md:col-span-2 bg-[#f9f8f3] border-l-4 border-[#b5a28a] p-4 rounded-r-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#b5a28a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8c7457]">
                    Critical Guidance: Do Not Over-Assume Intention
                  </h4>
                  <p className="text-xs text-[#6e5e4a] leading-relaxed mt-1">
                    Japanese communication highly values relational harmony and context. <strong>Do not assume any single interpretation below is 100% correct or absolute.</strong> Overclaiming a speaker's intention can lead to social pressure or unnecessary worry. Use these possible interpretations purely as an awareness tool.
                  </p>
                </div>
              </div>

              {/* Literal Meaning Card */}
              <div id="literal-meaning-card" className="bg-[#faf9f4] border border-[#ece9df] rounded-2xl p-5 md:col-span-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#a1a190] mb-2.5 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Literal Meaning</span>
                </h3>
                <div className="border-l-2 border-[#5a5a40]/20 pl-3">
                  <p className="text-base italic font-serif text-[#5a5a40] leading-snug">
                    "{result.literal_meaning}"
                  </p>
                  <p className="mt-2 text-xs text-[#8a8a7a] leading-relaxed">
                    <span className="font-semibold text-[#6e6e58]">Plain English:</span> {result.plain_english_gloss}
                  </p>
                </div>
              </div>

              {/* Uncertainty Note Card */}
              <div id="uncertainty-card" className="bg-[#faf9f4] border border-[#ece9df] rounded-2xl p-5 md:col-span-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#a1a190] mb-2.5 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Uncertainty & Context</span>
                </h3>
                <p className="text-xs leading-relaxed text-[#434338] mb-3">
                  {result.uncertainty_note}
                </p>
                {result.missing_context && result.missing_context.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#ece9df]">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#a1a190] mb-1.5">
                      Missing Context to look out for:
                    </p>
                    <ul className="text-xs space-y-1 text-[#6a6a59] list-disc list-inside">
                      {result.missing_context.map((item, index) => (
                        <li key={index} className="leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Possible Interpretations Card */}
              <div id="possible-interpretations-card" className="bg-white border border-[#ece9df] rounded-2xl p-5 md:col-span-2">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#a1a190] mb-4 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Possible Interpretations</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.possible_interpretations.map((item, index) => {
                    const isHigh = item.confidence?.toLowerCase() === "high";
                    const isMedium = item.confidence?.toLowerCase() === "medium";
                    const badgeBg = isHigh ? "bg-amber-50 text-amber-800 border-amber-200/50" : isMedium ? "bg-blue-50 text-blue-800 border-blue-200/50" : "bg-gray-50 text-gray-700 border-gray-200";
                    return (
                      <div key={index} className="border border-[#f0eee4] bg-[#fdfbf9] rounded-xl p-4 flex flex-col justify-between transition-all hover:shadow-sm">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span className="text-xs font-bold text-[#5a5a40]">{item.label}</span>
                            <span className={`px-2 py-0.5 border rounded-full text-[9px] uppercase tracking-wider font-semibold ${badgeBg}`}>
                              {item.confidence} confidence
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-[#5a5a40] mb-3">
                            {item.explanation}
                          </p>
                        </div>
                        {item.risk_if_over_assumed && (
                          <div className="mt-2 p-2.5 bg-[#f5f2e9] rounded-lg border-l-2 border-[#b5a28a]">
                            <p className="text-[9px] font-bold text-[#8c7457] uppercase tracking-wider">
                              Risk if over-assumed
                            </p>
                            <p className="text-[10px] text-[#6e5e4a] leading-relaxed mt-0.5">
                              {item.risk_if_over_assumed}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Low-Risk Reply Suggestions Card */}
              <div id="low-risk-suggestions-card" className="bg-white border border-[#ece9df] rounded-2xl p-5 md:col-span-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#a1a190] mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Low-Risk Reply Suggestions</span>
                </h3>
                
                <div className="space-y-3.5">
                  {result.suggested_replies_japanese && result.suggested_replies_japanese.map((reply, index) => {
                    return (
                      <div key={index} className="p-3.5 bg-[#f9f8f3] border border-[#f0eee4] rounded-xl relative group">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#a1a190] bg-[#efede4] px-1.5 py-0.5 rounded">
                            {reply.tone}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#434338] select-all leading-relaxed bg-[#f1f0e8]/40 p-2 rounded border border-[#ece9df]/50">
                          {reply.reply}
                        </p>
                        <p className="text-[9px] font-mono text-[#8a8a7a] mt-1 italic">
                          Romaji: {reply.romaji}
                        </p>
                        <p className="text-[11px] text-[#5a5a40] mt-1.5 font-serif border-t border-[#ece9df]/40 pt-1.5">
                          "{reply.english_translation}"
                        </p>
                      </div>
                    );
                  })}

                  {result.suggested_replies_english && result.suggested_replies_english.length > 0 && (
                    <div className="mt-4 pt-3.5 border-t border-[#f0eee4]">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#a1a190] mb-1.5">
                        English Response Guidelines:
                      </p>
                      <ul className="text-xs space-y-1 text-[#6a6a59] list-disc list-inside">
                        {result.suggested_replies_english.map((item, index) => (
                          <li key={index} className="leading-relaxed">"{item}"</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Risks Actions to Avoid Card & Safety Note */}
              <div id="risks-actions-card" className="bg-[#5a5a40] text-white rounded-2xl p-5 md:col-span-1 flex flex-col justify-between shadow-sm">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider opacity-60 mb-3 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Risky Actions to Avoid</span>
                  </h3>
                  <ul className="text-xs space-y-2.5 list-disc list-inside opacity-90 pl-1">
                    {result.risky_actions_to_avoid && result.risky_actions_to_avoid.map((action, index) => (
                      <li key={index} className="leading-relaxed">
                        <span className="font-semibold">{action}</span>
                      </li>
                    ))}
                  </ul>

                  {result.low_risk_next_steps && result.low_risk_next_steps.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-2">
                        Alternative Low-Risk Steps:
                      </h4>
                      <ul className="text-xs space-y-1 list-none pl-0">
                        {result.low_risk_next_steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-1.5 leading-relaxed py-0.5">
                            <span className="opacity-80">🌱</span>
                            <span className="opacity-90">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 mt-5">
                  <p id="safety-note" className="text-[10px] leading-relaxed italic opacity-75">
                    {result.safety_note || "Safety Note: This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."}
                  </p>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-[#ece9df] rounded-2xl p-12 text-center text-[#8a8a7a]">
              Please write a Japanese message or choose a sample to see interpretations.
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#ece9df] bg-[#faf9f4] py-6 text-center text-xs text-[#8a8a7a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 HonneAgent. Respecting boundaries, avoiding stereotypes.</p>
          <p className="font-serif italic text-[#5a5a40]">Designed with Natural Tones aesthetic.</p>
        </div>
      </footer>
    </div>
  );
}
