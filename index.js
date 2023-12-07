import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "5G Connectivity: Enabling the Future of Communication",
    content:
      "The advent of 5G technology has ushered in a new era of connectivity, promising faster data speeds, lower latency, and enhanced network reliability. This technological leap is not only transforming communication but also fueling innovations like augmented reality (AR), virtual reality (VR), and the Internet of Things (IoT). With 5G, we can expect a seamless and interconnected world, empowering diverse industries and shaping the way we experience digital content and services.",
    author: "Muthu Kamatchi",
    date: "2023-10-10T09:15:00Z",
  },
  {
    id: 2,
    title: "Artificial Intelligence in Healthcare",
    content:
    "Artificial Intelligence (AI) is revolutionizing healthcare, offering solutions for diagnostics, personalized medicine, and patient care. Machine learning algorithms analyze vast datasets to identify patterns and make predictions, aiding in early disease detection and treatment planning. AI applications also streamline administrative tasks, allowing healthcare professionals to focus more on patient care. As AI technologies advance, they hold the potential to make healthcare more accessible, efficient, and tailored to individual patient needs.",
    author: "Muthu Kamatchi",
    date: "2023-10-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Quantum Computing Revolution",
    content:
      "Quantum computing stands at the forefront of technological innovation, promising unparalleled computational power. Unlike classical computers that use bits, quantum computers leverage qubits, allowing for parallel processing and the potential to solve complex problems exponentially faster. As researchers make strides in overcoming challenges like maintaining qubit coherence, industries are exploring quantum applications for cryptography, optimization, and drug discovery.",
    author: "Muthu Kamatchi",
    date: "2023-10-01T10:00:00Z",
  },
  {
    id: 4,
    title: "Blockchain: Beyond Cryptocurrency",
    content:
      "While initially recognized for powering cryptocurrencies, blockchain technology has evolved into a versatile solution with applications across various industries. Its decentralized and tamper-resistant nature ensures transparency and security in processes such as supply chain management, voting systems, and digital identity verification. As blockchain continues to mature, it holds the potential to reshape traditional business models and establish new standards for trust and accountability.",
    author: "Muthu Kamatchi",
    date: "2023-10-05T14:30:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//GET All posts
app.get("/posts", (req, res) => {
  // console.log(posts);
  res.json(posts);
});

//GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const new_id = parseInt(req.params.id); 
  const index = posts.findIndex((post) => post.id === new_id);
  res.json(posts[index]);
});

//POST a new post
app.post("/posts", (req, res) => {
  const id = posts.length + 1;
  const new_title = req.body.title;
  const new_content = req.body.content;
  const new_author = req.body.author;
  const date = new Date();
  const cur_date = date.toISOString();
  posts.push({
    id: id,
    title: new_title,
    content: new_content,
    author: new_author,
    date: cur_date
  })
  res.json(posts);
});

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  console.log("patch");
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  // console.log(id);
  const date = new Date();
  const cur_date = date.toISOString();
  var title = req.body.title;
  var author = req.body.author;
  if(title == "")
    title = posts[index].title;
  if(author == "")
    author = posts[index].author;
  posts[index] = { 
    id: id,
    title: title,
    content: posts[index].content,
    author: author,
    date: cur_date
    };
  res.json(posts);
})

//DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  posts = posts.filter((post) => post.id != id);
  res.json(posts);
})


app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
