#!/usr/bin/env python3

import streamlit as st
from streamlit_lexical_extended import streamlit_lexical_extended

st.title("Test Full Document with Lists and Tables")

# Full document text with bullet lists and tables
full_document = """# Recognizing the Triggers: Understanding Aggression and Tantrums in Autistic Children

## Understanding Common Triggers in Autistic Children
Behavioral challenges like aggression and tantrums are often linked to specific triggers that children like Bryan experience. Recognizing these triggers allows parents to better anticipate and manage difficult moments, promoting a calmer, more supportive environment. Three major types of triggers frequently observed include:

### 1. Transitions Between Activities
Transitions are common sources of stress for autistic children. Moving from one activity to another—such as shifting from playtime to mealtime—can be overwhelming or unsettling if not handled thoughtfully. These transitions may cause feelings of frustration or anxiety, especially if the child isn't prepared or the change happens abruptly, leading to tantrums or aggressive responses.

### 2. Denied Access to Preferred Items or Activities
Many autistic children have favorite toys or activities that provide comfort or excitement. When they are told they cannot access these preferred items, they might feel upset or anxious. Such denial can lead to emotional outbursts, which serve as a way to protest or express frustration when their expectations aren't met.

### 3. Sensory Overload
Autistic children often have heightened sensory sensitivities. Bright lights, loud noises, strong smells, or crowded environments can easily become too much to handle. Sensory overload can trigger distress and manifest as aggressive behaviors or tantrums, as the child struggles to process overwhelming stimuli.


> snkajsdk ajnsk jasD asd 
> sajfnksjn ksjnka      
> #### ajndakjsndakljsnd
> **djanjdnlkajndlkajnsdkja*** a adakjndkjsn

| Trigger Category       | Description                                              | Bryan's Example                                    |
|------------------------|----------------------------------------------------------|---------------------------------------------------|
| Transitions            | Moving from one activity or environment to another       | Moving from play to mealtime without warning      |
| Denied Access          | Not getting a preferred toy or activity                  | Being told no when trying to play with a favorite toy |
| Sensory Overload       | Overstimulation from sound, light, or smell              | Loud noises from a vacuum or crowded spaces        |

## Recognizing Early Warning Signs
Being able to spot early signs of distress can make a significant difference in preventing escalation. These cues are often subtle but valuable indicators that Bryan is starting to become upset:

### Facial Expressions
- Frowning or grimacing
- Tightening lips or jaw
- Avoiding eye contact or showing a distressed gaze

### Restlessness and Body Language
- Pacing or engaging in repetitive movements like hand-flapping or rocking
- Increased fidgeting or difficulty sitting still
- Tense posture or clenched fists

### Vocalizations
- Whining or crying
- Elevated pitch or volume
- Non-verbal sounds such as sighs or grunts indicating discomfort

### Withdrawal and Avoidance
- Turning away from interaction
- Covering ears or face
- Seeking solitude or attempting to leave the situation

| Early Sign             | What to Look For                                       | How It Might Look in Bryan                          |
|------------------------|--------------------------------------------------------|---------------------------------------------------|
| Facial Expression      | Changes like frowning, grimacing, distressed signs   | Furrowed brow when denied a toy                   |
| Restlessness           | Increased movement or repetitive behaviors            | Pacing or hand-flapping                          |
| Vocalizations          | Whining, crying, or non-verbal distress sounds        | Soft whining escalating with routine changes     |
| Withdrawal             | Pulling away or covering ears                          | Turning away and retreating when overwhelmed     |

## Tracking Triggers: Keeping a Simple Daily Log
A straightforward method to understand Bryan's behaviors is to keep a daily log. This helps identify patterns and specific situations that often lead to challenging behaviors, enabling more effective intervention strategies.

### How to Set Up a Tracking Log
- Use a notebook or digital chart with columns for Date, Time, Situation/Trigger, Early Signs, Behavior, and Outcome.
- Record observations promptly and consistently for accuracy.
- Note what soothing strategies or supports helped Bryan stay calm or avoid escalation.

### Sample Daily Log
| Date       | Time   | Situation/Trigger            | Early Signs                | Behavior          | Intervention/Outcome                       |
|------------|--------|------------------------------|----------------------------|-------------------|-------------------------------------------|
| 2025-09-10 | 4 PM   | Transition to mealtime        | Frowning, restless         | Crying, hitting   | Showed PECS "break" card; offered sensory toy; calmed down |
| 2025-09-11 | 9 AM   | Denied preferred toy          | Whining, turning away      | Tantrum, screaming| Redirected to another activity; offered choice after 5 mins |

### Benefits of Tracking
- Spot common or severe triggers
- Recognize early signs unique to Bryan
- Identify difficult times of day or activities
- Customize intervention strategies
- Share detailed insights with therapy providers

## Proactive Intervention: Using Recognized Patterns
Understanding Bryan's specific triggers and early cues allows for timely, calm responses that can prevent escalation.

### Practical Strategies
- **Use PECS Communication**: When early signs of frustration appear, gently prompt Bryan to use giving or requesting pictures. For example, a "break" card can offer a positive outlet for needs.
- **Provide Sensory Breaks**: If sensory overload is suspected, offer a quiet space with preferred calming items—like headphones or a soft fidget toy—before behaviors escalate.
- **Prepare for Transitions**: Use visual schedules and give advance warnings ("5 more minutes of play, then dinner") to help Bryan anticipate change, reducing anxiety.
- **Use Calm Redirection and Praise**: Briefly acknowledge his feelings, then redirect to a calmer activity, praising efforts to communicate or self-regulate.

### Example Scenario
As you prepare to switch from play to mealtime, Bryan begins to frown and pace. Noticing these signs, you show him the PECS card for "break." If he hands you the card, praise him and provide sensory support to help him transition smoothly. This proactive response helps prevent a tantrum.

## Supporting Emotional Regulation Through Awareness
The core principle is that many behaviors are a form of communication. By observing early cues and responding thoughtfully, parents help Bryan feel understood and supported.

- Regularly review the behavior logs to stay prepared.
- Recognize that understanding triggers reduces stress for everyone.
- Foster a nurturing environment tailored to Bryan's needs, promoting emotional safety.

## Summary: From Observation to Action

| Step                  | What to Do                                    | Why It Helps                                  |
|-----------------------|----------------------------------------------|----------------------------------------------|
| Identify Triggers     | Note situations like transitions, denied items, sensory overload | Anticipate and plan for challenging moments |
| Recognize Early Signs| Watch for facial cues, body language, vocalizations, withdrawal | Intervene before behaviors escalate       |
| Keep a Consistent Log | Record details daily for pattern recognition | Refine interventions and support strategies |
| Use Supports Proactively | Prompt communication, sensory breaks, schedules | Reduce frustration and promote calmness |
| Respond Calmly       | Acknowledge feelings, redirect positively | Build trust and emotional resilience       |

By integrating these practices into daily routines, parents can create a supportive environment that helps Bryan navigate his emotional challenges with confidence, patience, and understanding. This approach not only reduces behavioral issues but also fosters growth, communication, and emotional regulation."""

st.write("Testing full document with bullet lists and tables:")

st.button("do nothing ")

result = full_document

# Create the editor with the full document
result = streamlit_lexical_extended(
    value=full_document,
    placeholder="Type something...",
    height=600,
    key="full_document_test"
)




st.write("Current markdown content:")
if result:
    st.markdown(result)

    st.code(result[:500] + "..." if len(result) > 500 else result)
else:
    st.write("No content")