// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", process.env.NEXT_OPEN_AI_TOKEN);
  myHeaders.append("Content-Type", "application/json");

  const data = !req.body.summary
    ? `${req.body.values.s_type}:\n\n ${req.body.values.textarea}`
    : `${req.body.values.s_type}:\n\n ${req.body.summary}`;

    console.log('data',data)
  var raw = JSON.stringify({
    model: "text-davinci-003",
    prompt: data,
    // prompt:
    //   "Summarize this as a friendly:\n\nJupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus.",
    temperature: 0.7,
    max_tokens: 45,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.openai.com/v1/completions?", requestOptions)
    .then((response) => response.json())
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log("error", error));
}
