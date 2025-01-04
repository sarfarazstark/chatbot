import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function DeleteChatHistory({ className = "" }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);

    const {
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm();

    const confirmDeletion = () => {
        setConfirmingDeletion(true);
    };

    const deleteHistory = (e) => {
        e.preventDefault();

        destroy(route("message.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Delete Chat History
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Once your chat history is deleted, all of your messages will
                    be permanently deleted. This action cannot be undone.
                </p>
            </header>

            <DangerButton onClick={confirmDeletion}>
                Delete Chat History
            </DangerButton>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteHistory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Are you sure you want to delete your chat history?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Once your chat history is deleted, all of your messages
                        will be permanently deleted. This action cannot be
                        undone.
                    </p>

                    {errors.general && (
                        <InputError message={errors.general} className="mt-2" />
                    )}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {processing ? "Deleting..." : "Delete Chat History"}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
