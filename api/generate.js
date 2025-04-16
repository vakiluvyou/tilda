export default async function handler(req, res) {
  const body = await req.body ? JSON.parse(req.body) : req;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': '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',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: body.prompt,
      n: 1,
      size: "1024x1024"
    }),
  });

  const data = await response.json();

  if (!data.data || !data.data[0]) {
    return res.status(400).json({ error: 'Не удалось сгенерировать изображение' });
  }

  const imageUrl = data.data[0].url;
  res.status(200).json({ imageUrl });
}