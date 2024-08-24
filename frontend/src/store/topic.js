import { create } from "zustand";

export const useTopicStore = create((set) => ({
  topics: [],
  setTopics: (topics) => set({ topics }),
  createTopic: async (newTopic) => {
    if (
      !newTopic.term ||
      !newTopic.definition ||
      !newTopic.book ||
      !newTopic.chapter
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTopic),
    });
    const data = await res.json();
    set((state) => ({ topics: [...state.topics, data.data] }));
    return { success: true, message: "Topic created successfully" };
  },
  fetchTopics: async () => {
    const res = await fetch("/api/topics");
    const data = await res.json();
    set({ topics: data.data });
  },
  deleteTopic: async (pid) => {
    const res = await fetch(`/api/topics/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      topics: state.topics.filter((topic) => topic._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateTopic: async (pid, updatedTopic) => {
    const res = await fetch(`/api/topics/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTopic),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      topics: state.topics.map((topic) =>
        topic._id === pid ? data.data : topic
      ),
    }));

    return { success: true, message: data.message };
  },
}));
