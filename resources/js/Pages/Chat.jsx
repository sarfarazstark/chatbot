import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatInterface from "@/Layouts/ChatInterface";

export default function Chatbot() {
    return (
        <AuthenticatedLayout>
            <Head title="Chat" />
            <ChatInterface />
        </AuthenticatedLayout>
    );
}
