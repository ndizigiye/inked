interface StoryBodyProps {
  body: string;
}

export function StoryBody({ body }: StoryBodyProps) {
  return (
    <article className="story-prose max-w-2xl mx-auto">
      {body.split("\n\n").map((paragraph, i) =>
        paragraph.trim() ? (
          <p key={i} className="mb-6">
            {paragraph}
          </p>
        ) : (
          <br key={i} />
        )
      )}
    </article>
  );
}
