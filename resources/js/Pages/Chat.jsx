import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatInterface from "@/Layouts/ChatInterface";

export default function Chat({ messages, user }) {
    return (
        <AuthenticatedLayout>
            <Head title="Chat" />
            <ChatInterface messages={messages} user={user} />
        </AuthenticatedLayout>
    );
}
