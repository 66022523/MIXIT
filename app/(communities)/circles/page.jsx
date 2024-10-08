"use client";
import { useState } from "react";
import CommentModal from "@/components/CommentModal";

export default function Circles() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <div>
            <h1>Test Modal</h1>

            {/* ปุ่มเปิด Modal */}
            <button onClick={toggleModal} className="btn btn-primary">
                Open Comment Modal
            </button>

            {/* แสดง Comment Modal */}
            {isModalVisible && <CommentModal toggleModal={toggleModal} />}
        </div>
    );
}
