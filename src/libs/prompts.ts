export const Propmts = {
  title: ({
    topic,
    keywords,
    targetAudience,
    targetLocation,
  }: {
    topic: string;
    keywords: string;
    targetAudience: string;
    targetLocation: string;
  }) =>
    `Craft a compelling blog title under 70 letters for the topic '${topic}', using keywords '${keywords}', targeted at '${targetAudience}' in '${targetLocation}'. Ensure the title conveys the essence of '${topic}' with a power word and an emotion.`,
  outline: ({
    generatedTitle,
    topic,
    targetAudience,
    targetLocation,
    language,
    keywords,
  }: {
    generatedTitle: string;
    topic: string;
    targetAudience?: string;
    targetLocation?: string;
    language?: string;
    keywords?: string;
  }) => `Create a structured outline in '${language}' for the blog titled '${generatedTitle}', centered around '${topic}'. The outline should consist of 10 sections, each exploring a different facet of '${topic}'. Begin with a section that sets the stage for the discussion, framed as an H2 heading, and conclude with smaller h tags that summarizes the key insights and takeaways, also under an H2 heading. Only output html heading tags.

        For common and technical terms related to '${topic}', use transliteration to maintain their original English pronunciation and specificity, ensuring these terms are easily recognized by readers familiar with the subject matter.

        The main body should include minimum of 8 H2 headings for detailed exploration of '${topic}'. Each H2 heading should be supported by 1-3 H3 subheadings to delve into specific aspects, and under most H3 subheadings, include 1-2 H4 subheadings for advanced topics, offering deep insights beyond general knowledge. Incorporate '${keywords}' seamlessly, especially within the H2 and H3 levels, to optimize for SEO while maintaining a coherent and engaging narrative for '${targetAudience}' in '${targetLocation}'.

        Ensure each heading starts after the closing of the previous heading's tags to maintain clear structure. Include an 'FAQ' section as one of the H2 headings, addressing 3-5 common questions related to '${topic}' in a conversational tone, presented in h4 tags without providing the answers in the outline.

        The outline should facilitate a logical flow from one section to the next, building upon the information presented and leading to a comprehensive understanding of '${topic}', ensuring the content is both comprehensive and insightful.`,
  blogFirstParagraph: ({
    title,
    outline,
    language,
  }: {
    title: string;
    outline: string;
    language: string;
  }) =>
    `Output only in html code without head and body tags only content inside body  well crafted html only no markdown or any other format.
    Compose an engaging introduction entirely in '${language}' for the blog titled '${title}', which revolves around '${outline}'. Start with a compelling sentence to capture attention, steering clear of clichés. Employ questions, vivid imagery, or strong statements pertinent to the topic to engage readers. For technical terms or globally recognized terms, apply transliteration to keep their original English spelling. Emphasize that the entire content, including this introduction, should strictly be in '${language}', providing insights that encourage further reading. The introduction should be 100-150 words long, clearly marked with a <h2>Introduction</h2> heading, and consist of small paragraphs, each with 2-3 sentences.`,
  blogLastParagraph: ({
    title,
    outline,
    language,
  }: {
    title: string;
    outline: string;
    language: string;
  }) =>
    `Output only in html code without head and body tags only content inside body  well crafted html only no markdown or any other format.
    Craft a memorable conclusion strictly in '${language}' for '${title}', encapsulating the core insights. Use transliteration for technical terms or universally acknowledged terms to preserve their original English spelling. This section should reinforce the main themes discussed, prompting deeper contemplation or action from the readers. Ensure the entire conclusion is in '${language}', comprising 100-150 words. Conclude with a call to action relevant to the blog's topic. Title this segment <h2>Conclusion</h2>, ensuring it offers a coherent end to the narrative and motivates reader interaction. Structure this with short paragraphs, each containing 2-3 sentences.`,
  blogBetween: ({
    title,
    outline,
    language,
    targetAudience,
    targetLocation,
    keywords,
  }: {
    title: string;
    outline: string;
    language?: string;
    targetAudience?: string;
    targetLocation?: string;
    keywords?: string;
  }) =>
    `Output only in html code without head and body tags only content inside body  well crafted html only no markdown or any other format.
    Develop a detailed section in '${language}' for the blog titled '${title}', aimed at '${targetAudience}' in '${targetLocation}', and centered around the theme '${outline}'. For technical terms, brand names, or specialized jargon, use transliteration to maintain their original English pronunciation and specificity. This ensures that terms with technical significance are easily recognized by readers familiar with the subject matter. Ensure all content is in '${language}'.

        Guidelines to Follow:

        - Keywords Integration: Seamlessly incorporate '${keywords}' and closely related semantic terms within the content, ensuring natural use without overdoing it.
        - Narrative Flow: Connect this section smoothly with other parts of the blog, avoiding conclusive statements to keep the overall narrative open for further exploration.
        - HTML Formatting: Use <h2> for main headings and <h3>, <h4> for subheadings, keeping the structure concise and under 600 words in total. Create tables if required to explain the section better, ensuring they are readable on all devices.
        - Content Quality: Aim for originality and depth, avoiding clichés. The content should be easy to understand, with a conversational tone, and include personal pronouns to enhance relatability.
        - Engagement and Clarity: Utilize bullet points (<ul>) to outline key points and maintain short paragraphs, enhancing readability.
        - Expertise and Relevance: Provide advice based on experience, ensuring all information is accurate, up-to-date, and unbiased.

        This section should stand alone as comprehensive and informative, effectively contributing to the blog's overall quality and appeal. Ensure the section is complete and coherent, avoiding abrupt endings.`,
};
