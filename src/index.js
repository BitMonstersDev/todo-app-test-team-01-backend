const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');
const { notFound } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');
const { MESSAGES } = require('./constants/messages');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: MESSAGES.HEALTHY });
});

// Todo routes
app.use('/todos', todosRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
