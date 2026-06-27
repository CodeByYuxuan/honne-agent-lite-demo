import { SampleScenario } from "../types";

export const SAMPLE_SCENARIOS: Record<string, SampleScenario> = {
  "行けたら行く": {
    message: "行けたら行く",
    relationship: "friend",
    context: "Invited them to a casual weekend dinner party at my apartment.",
    goal: "decide whether to follow up",
    presetResponse: {
      literal_meaning: "I will go if I can go.",
      plain_english_gloss: "I'll go if I can make it.",
      possible_interpretations: [
        {
          label: "Polite refusal (High probability)",
          explanation: "In casual Japanese social situations, this is a standard idiom used to decline an invitation softly. It allows the speaker to avoid the social awkwardness of a direct 'No' while maintaining harmony.",
          confidence: "medium",
          risk_if_over_assumed: "If you count them as a guaranteed guest, make reservations, or buy food expecting them, you may end up disappointed and create a situation where they feel guilty."
        },
        {
          label: "Genuine uncertainty (Low probability)",
          explanation: "There is a slight chance they genuinely want to attend but are waiting on another commitment (such as a part-time job shift or family schedule) and cannot confirm yet.",
          confidence: "low",
          risk_if_over_assumed: "Pressuring them to 'let you know as soon as possible' might force them to officially decline to avoid causing you trouble."
        }
      ],
      uncertainty_note: "The phrase '行けたら行く' is notoriously ambiguous. Among close friends, it leans heavily (approx. 80-90%) toward a polite decline, but the speaker maintains a thin layer of plausible deniability to prevent any negative feelings.",
      missing_context: [
        "How quickly did they reply? (A fast reply might indicate a polite formulaic decline, while a slow reply might mean they actually checked their calendar).",
        "Your history of meetups (Do they usually join when invited, or do they frequently use this phrase?)."
      ],
      risky_actions_to_avoid: [
        "Asking for a definitive deadline (e.g., 'When will you know for sure?').",
        "Booking a non-refundable ticket or reservation expecting them.",
        "Expressing disappointment or accusing them of being non-committal."
      ],
      low_risk_next_steps: [
        "Acknowledge their response warmly and leave the door open without placing any burden of confirmation on them.",
        "Plan the event assuming they will not attend, but ensure there is space for them to join last-minute if they do show up.",
        "Reply with a casual, zero-pressure message."
      ],
      suggested_replies_japanese: [
        {
          reply: "はーい！来れそうだったら連絡してね。無理はしないでね！",
          tone: "casual",
          romaji: "Haai! Koresou dattara renraku shite ne. Muri wa shinaide ne!",
          english_translation: "Okay! Let me know if you can make it. Don't push yourself!"
        },
        {
          reply: "了解です！もしタイミングが合えばぜひ。また連絡しますね。",
          tone: "polite",
          romaji: "Ryoukai desu! Moshi taimingu ga aeba zehi. Mata renraku shimasu ne.",
          english_translation: "Understood! If the timing works out, we'd love to have you. I'll be in touch."
        }
      ],
      suggested_replies_english: [
        "Respond casually in English: 'All good! Let me know if you can make it, but no worries if not!'",
        "Keep the conversation flowing on other topics without bringing up the event again unless they do."
      ],
      safety_note: "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
    }
  },
  "また今度ね": {
    message: "また今度ね",
    relationship: "classmate",
    context: "Asked if they wanted to study together for the midterms at a cafe after class.",
    goal: "understand",
    presetResponse: {
      literal_meaning: "Also next time, okay?",
      plain_english_gloss: "Maybe next time / Let's do it another time.",
      possible_interpretations: [
        {
          label: "Polite decline of the current invite",
          explanation: "The speaker is saying 'not this time.' They are expressing that they cannot make it right now but are cushioning the rejection by referencing a vague future ('next time').",
          confidence: "high",
          risk_if_over_assumed: "Assuming this is a firm promise for a future study session and immediately proposing another concrete date (e.g., 'How about Tuesday instead?') can make them feel cornered.",
        },
        {
          label: "Friendly open-ended buffer",
          explanation: "They genuinely like you but are currently exhausted, busy, or prefer to study alone, and want to keep relations friendly.",
          confidence: "medium",
          risk_if_over_assumed: "Taking it too personally as a sign of dislike. In Japan, protecting the relationship via polite postponement is a positive social effort, not necessarily cold rejection."
        }
      ],
      uncertainty_note: "The word '今度' (kondo) is highly situational. It literally means 'this time' or 'next time' depending on context, but in 'また今度', it acts as a soft buffer to decline without saying 'No.' Without a specific proposed alternative date from them, 'また今度' should be treated as a gentle close to this round of invitations.",
      missing_context: [
        "Whether they followed up with a reason (e.g., 'I have a report due' vs. just 'また今度ね').",
        "How close you are in class (Do you talk regularly during breaks?)."
      ],
      risky_actions_to_avoid: [
        "Immediately replying with alternative days, times, or locations.",
        "Asking 'Why can't you go?' or trying to resolve their schedule.",
        "Over-analyzing and becoming cold toward them in class."
      ],
      low_risk_next_steps: [
        "Give a warm, low-pressure acknowledgment that closes the topic comfortably.",
        "Let them be the one to bring up studying or hanging out next time.",
        "Keep future classroom interactions friendly and normal."
      ],
      suggested_replies_japanese: [
        {
          reply: "はーい、またね！テスト勉強がんばってね！",
          tone: "casual",
          romaji: "Haai, mata ne! Tesuto benkyou ganbatte ne!",
          english_translation: "Okay, see you! Good luck studying for the test!"
        },
        {
          reply: "わかりました！また今度ぜひ。お互いテストがんばりましょう！",
          tone: "polite",
          romaji: "Wakarimashita! Mata kondo zehi. Otagai tesuto ganbarimashou!",
          english_translation: "I understand! Let's definitely do it another time. Let's both do our best on the tests!"
        }
      ],
      suggested_replies_english: [
        "Keep it simple: 'No problem! Good luck with your studies, see you in class!'",
        "Use a friendly emoji to show there are absolutely no hard feelings."
      ],
      safety_note: "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
    }
  },
  "最近ちょっと忙しくて": {
    message: "最近ちょっと忙しくて",
    relationship: "coworker",
    context: "Asked them if they wanted to get lunch together during the break.",
    goal: "reduce misunderstanding",
    presetResponse: {
      literal_meaning: "Lately, a bit busy, and...",
      plain_english_gloss: "Lately I've been a little busy...",
      possible_interpretations: [
        {
          label: "Temporary polite raincheck",
          explanation: "The speaker is currently facing a heavy workload, project deadline, or personal tasks and genuinely doesn't have the emotional or mental bandwidth for social lunches right now.",
          confidence: "high",
          risk_if_over_assumed: "Assuming they are avoiding you permanently. They may just need personal downtime during breaks to recharge from work stress.",
        },
        {
          label: "Boundary setting",
          explanation: "As coworkers, they may prefer to keep work and personal life separate, using 'busy' as a professional, comfortable boundary that preserves workplace harmony.",
          confidence: "medium",
          risk_if_over_assumed: "Continuing to invite them every week, which might make them feel uncomfortable or forced to find more excuses."
        }
      ],
      uncertainty_note: "Ending a sentence with '...て' (-te form) is a common Japanese strategy to leave the ending unsaid and soft. By saying 'busy, and...', they let you draw the conclusion ('so I can't go') without them having to say the harsh words 'I cannot go' or 'I don't want to.'",
      missing_context: [
        "Are they in the middle of a major project or audit?",
        "Do they eat lunch at their desk, go out alone, or go out with other teams?"
      ],
      risky_actions_to_avoid: [
        "Investigating their schedule or questioning what they are busy with.",
        "Offering to buy them lunch or bring food to their desk (which can feel suffocating or overstep professional boundaries).",
        "Reacting with coldness or passive-aggression in professional meetings."
      ],
      low_risk_next_steps: [
        "Acknowledge their busy status sympathetically, placing zero pressure on them.",
        "Enjoy your own lunches and allow them their personal break time.",
        "Re-evaluate in a few weeks or wait for them to initiate a casual lunch chat."
      ],
      suggested_replies_japanese: [
        {
          reply: "そうなんですね！最近お仕事大変そうですもんね。無理せず休んでください！",
          tone: "polite",
          romaji: "Sou nan desu ne! Saikin oshigoto taihen sou desu mon ne. Muri sezu yasunde kudasai!",
          english_translation: "I see! Work seems really intense lately. Please take it easy and get some rest!"
        },
        {
          reply: "お疲れ様です！落ち着いたらまた行きましょう。お仕事がんばってください！",
          tone: "boundary-respecting",
          romaji: "Otsukaresama desu! Ochitsuïtara mata ikimashou. Oshigoto ganbatte kudasai!",
          english_translation: "Thanks for your hard work! Let's go when things settle down. Good luck with your work!"
        }
      ],
      suggested_replies_english: [
        "Keep it professional and encouraging: 'Totally understand, work has been super busy! Take care and let's catch up later.'"
      ],
      safety_note: "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
    }
  },
  "また時間が合えば": {
    message: "また時間が合えば",
    relationship: "language exchange partner",
    context: "Asked if they would like to do a voice call study session this Friday evening.",
    goal: "reply politely",
    presetResponse: {
      literal_meaning: "Again, if time fits.",
      plain_english_gloss: "If our schedules/times align next time / When we both have time.",
      possible_interpretations: [
        {
          label: "Open postponement",
          explanation: "They are open to a call but Friday evening doesn't work, or they don't want to lock in a specific slot right now. It leaves the schedule open to chance.",
          confidence: "medium",
          risk_if_over_assumed: "Treating this as an invitation to send a list of all your available time slots for the next two weeks.",
        },
        {
          label: "Polite sign-off to language practice",
          explanation: "They might have less free time for language exchange due to school or life changes, and are gently wrapping up this cycle of active meetings without officially ending the partnership.",
          confidence: "medium",
          risk_if_over_assumed: "Spamming them with language questions or insisting on setting up a regular weekly schedule."
        }
      ],
      uncertainty_note: "The conditional form '〜ば' (if) combined with 'また' (again) is highly passive. It shifts the agency from the speakers to the 'time/schedule' itself, allowing them to say 'if the universe allows' rather than 'let's make it happen.'",
      missing_context: [
        "How active has your language exchange been recently?",
        "Have they been busy with exams, jobs, or moving?"
      ],
      risky_actions_to_avoid: [
        "Immediately replying with a calendar link or a list of 5 alternative times.",
        "Asking 'When do you think you'll have time?'",
        "Apologizing excessively as if you made a mistake by inviting them."
      ],
      low_risk_next_steps: [
        "Reply with a very relaxed, positive confirmation that accepts the conditional stance.",
        "Share a casual, interesting learning resource (e.g., a meme or a quick word) later on without asking to meet up, keeping the connection warm and low-pressure.",
        "Let them initiate the next call scheduling when they are ready."
      ],
      suggested_replies_japanese: [
        {
          reply: "そうですね！またお互い時間がある時にやりましょう。楽しい週末を！",
          tone: "soft",
          romaji: "Sou desu ne! Mata otagai jikan ga aru toki ni yarimashou. Tanoshii shuumatsu wo!",
          english_translation: "True! Let's do it when we both have some free time. Have a great weekend!"
        },
        {
          reply: "了解です！またタイミングが合う時によろしくお願いしますね！",
          tone: "polite",
          romaji: "Ryoukai desu! Mata taimingu ga au toki ni yoroshiku onegai shimasu ne!",
          english_translation: "Got it! Looking forward to it when our timings align again!"
        }
      ],
      suggested_replies_english: [
        "Reply with a casual English alternative: 'Sounds good! Let's catch up whenever we're both free. Have a great week!'"
      ],
      safety_note: "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
    }
  },
  "みんなでなら行けるかも": {
    message: "みんなでなら行けるかも",
    relationship: "club member",
    context: "Asked them if they wanted to go see a movie together this Sunday.",
    goal: "decide whether to follow up",
    presetResponse: {
      literal_meaning: "If it's with everyone, I might be able to go.",
      plain_english_gloss: "Maybe I can go if we go as a group.",
      possible_interpretations: [
        {
          label: "Boundary setting (one-on-one aversion)",
          explanation: "The speaker is uncomfortable or hesitant about hanging out one-on-one, which can feel like a date or a high-pressure social situation. They are very comfortable with you in a group setting, however.",
          confidence: "high",
          risk_if_over_assumed: "Insisting on doing it one-on-one anyway (e.g., saying 'Oh, everyone is busy, let's just go ourselves') or taking it as a total rejection of your friendship.",
        },
        {
          label: "Preference for collective club activity",
          explanation: "In Japanese club (bukatsu/saakuru) cultures, group cohesion is highly prioritized. They may feel it is more natural or appropriate to hang out with other club members collectively.",
          confidence: "medium",
          risk_if_over_assumed: "Proposing a group outing with people they don't know, rather than other mutual club members."
        }
      ],
      uncertainty_note: "The particle 'なら' (nara) means 'if / under the condition of'. By specifying 'みんなでなら' (if with everyone), they establish a clear preference. The ending 'かも' (kamo) adds a soft layer of possibility/tentativeness.",
      missing_context: [
        "Do other club members often hang out together?",
        "Have you ever hung out with them one-on-one before?"
      ],
      risky_actions_to_avoid: [
        "Trying to persuade them to go one-on-one (e.g. 'It'll be fun just us!').",
        "Asking why they don't want to go alone with you.",
        "Canceling the plan entirely in a visible huff."
      ],
      low_risk_next_steps: [
        "Pivot the plan to a group outing and invite a couple of mutual club friends.",
        "Accept their boundary gracefully and treat them as a valued group/club friend.",
        "Send a cheerful message agreeing that a group outing would be super fun."
      ],
      suggested_replies_japanese: [
        {
          reply: "あ、それいいね！じゃあサークルの他のメンバーも誘ってみるね！",
          tone: "casual",
          romaji: "A, sore ii ne! Jaa saakuru no hoka no menbaa mo sasotte miru ne!",
          english_translation: "Ah, that's a great idea! I'll invite some other members from the club then!"
        },
        {
          reply: "いいですね！みんなでワイワイ行く方が楽しそう。他の人にも声をかけてみます！",
          tone: "polite",
          romaji: "Ii desu ne! Minna de waiwai iku hou ga tanoshisou. Hoka no hito ni mo koe wo kakete mimasu!",
          english_translation: "Great idea! It sounds more fun to go and have a lively time with everyone. I'll ask around!"
        }
      ],
      suggested_replies_english: [
        "Respond warmly: 'That's a fantastic idea! Let's make it a group trip. I'll ping the club group chat!'"
      ],
      safety_note: "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
    }
  },
  "I'll go if I can make it": {
    message: "I'll go if I can make it",
    relationship: "coworker",
    context: "Communicating in English. Invited them to a casual after-work drink session.",
    goal: "understand",
    presetResponse: {
      literal_meaning: "I will attend if it is possible for me to attend.",
      plain_english_gloss: "I'll try to go if my schedule and energy allow.",
      possible_interpretations: [
        {
          label: "Direct translation of 'Iketara iku' (Polite refusal)",
          explanation: "In Japanese, '行けたら行く' (I'll go if I can make it) is a standardized social formula for gently declining an invitation without saying 'No'. When communicating in English, Japanese speakers often translate this literal phrasing directly, unaware that in Western contexts, it sounds more like a tentative promise than a soft 'No'.",
          confidence: "high",
          risk_if_over_assumed: "If you count on their presence, buy them a drink, or assume they are definitely coming, you may feel stood up. In reality, they likely consider this a polite decline and do not plan to attend."
        },
        {
          label: "Genuine schedule conflict",
          explanation: "The speaker is currently looking at their remaining tasks or energy levels and is genuinely uncertain if they can finish in time to join.",
          confidence: "medium",
          risk_if_over_assumed: "Sending frequent status updates or asking 'Are you almost done?' can create intense professional pressure and cause discomfort."
        }
      ],
      uncertainty_note: "This is a classic example of cross-cultural communication gaps. The English words sound open-ended, but the underlying mental model is Japanese social etiquette where a direct 'No' is avoided to protect the relationship's comfort.",
      missing_context: [
        "Are they a close colleague or do they keep a professional distance?",
        "Have they ever joined casual events on short notice in the past?"
      ],
      risky_actions_to_avoid: [
        "Replying with 'Great, see you there!' as if they confirmed.",
        "Putting their name on a official RSVP list or pre-paying for their spot.",
        "Asking for a precise ETA (Estimated Time of Arrival)."
      ],
      low_risk_next_steps: [
        "Treat their attendance as 'absent by default' while leaving the option open for them.",
        "Send a friendly, zero-pressure reply closing the invitation warmly.",
        "Maintain normal, friendly conversational topics."
      ],
      suggested_replies_japanese: [
        {
          reply: "はーい、無理しないでくださいね！もし来られたら乾杯しましょう！",
          tone: "polite",
          romaji: "Haai, muri shinaide kudasai ne! Moshi koraretara kanpai shimashou!",
          english_translation: "Okay, please don't push yourself! If you can make it, let's have a toast!"
        }
      ],
      suggested_replies_english: [
        "Reply in English with low pressure: 'Sounds good! No pressure at all—hope to catch you if you can make it, but totally understand if you need to head home!'"
      ],
      safety_note: "This is not a hidden-intention decoder. It only shows plausible interpretations based on limited context."
    }
  }
};
