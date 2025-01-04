import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatInterface from "@/Layouts/ChatInterface";

export default function Chat({ messages }) {
    return (
        <AuthenticatedLayout>
            <Head title="Chat" />
            <ChatInterface messages={messages} />
        </AuthenticatedLayout>
    );
}
