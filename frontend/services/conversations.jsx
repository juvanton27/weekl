const conversations = [
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
    {
        id: 0,
        users_id: [0, 1],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 1,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 15000),
                liked: false,
            },
        ]
    },
    {
        id: 1,
        users_id: [0, 2],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 2,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 14000),
                liked: false,
            },
        ]
    },
    {
        id: 2,
        users_id: [0, 3],
        messages: [
            {
                user_id: 0,
                message: "Salut ça va !",
                date: new Date(new Date().getTime() - 20000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Ca va et toi ?",
                date: new Date(new Date().getTime() - 19000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Ca va, tu fais quoi ?",
                date: new Date(new Date().getTime() - 18000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Rien et toi ?",
                date: new Date(new Date().getTime() - 17000),
                liked: false,
            },
            {
                user_id: 0,
                message: "Rien",
                date: new Date(new Date().getTime() - 16000),
                liked: false,
            },
            {
                user_id: 3,
                message: "Conversation inutile je te bloque",
                date: new Date(new Date().getTime() - 13000),
                liked: false,
            },
        ]
    },
];

export default conversations;

export function getLastMessageFromConv(id) {
    if (id === undefined) return undefined;
    const convs = conversations.find(c => c.id === id)?.messages
    return convs[convs.length - 1];
}