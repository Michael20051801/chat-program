-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "sent" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recieved" DATE,
    "seen" DATE,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
