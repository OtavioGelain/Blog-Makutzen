import express from 'express'
import { router } from './routes/index.routes'
import { createBullBoard } from '@bull-board/api'
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from '@bull-board/express'
import { mailQueue } from './queue/mail.queue';

export const app = express()

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter,
});

app.use(express.json())
app.use(router)
app.use("/admin/queues", serverAdapter.getRouter());