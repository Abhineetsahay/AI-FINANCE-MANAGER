import api from "@/lib/api";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export const sendMessage = async (
    question: string
) => {
    const response = await api.post("/chat", {
        question,
    });

    return response.data;
};

export const getChatHistory = async () => {
    const response = await api.get(
        "/chat/history"
    );

    return response.data;
};

export const clearChatHistory = async () => {
    const response = await api.delete(
        "/chat/history"
    );

    return response.data;
};