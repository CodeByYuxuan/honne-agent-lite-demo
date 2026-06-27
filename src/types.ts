export interface InterpretationResponse {
  literal_meaning: string;
  plain_english_gloss: string;
  possible_interpretations: Array<{
    label: string;
    explanation: string;
    confidence: "low" | "medium" | "high" | string;
    risk_if_over_assumed: string;
  }>;
  uncertainty_note: string;
  missing_context: string[];
  risky_actions_to_avoid: string[];
  low_risk_next_steps: string[];
  suggested_replies_japanese: Array<{
    reply: string;
    tone: "soft" | "polite" | "casual" | "boundary-respecting" | string;
    romaji: string;
    english_translation: string;
  }>;
  suggested_replies_english: string[];
  safety_note: string;
}

export interface SampleScenario {
  message: string;
  relationship: string;
  context: string;
  goal: string;
  presetResponse: InterpretationResponse;
}
