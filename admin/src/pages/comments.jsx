import React from "react";

const comments = [
  { id: 1, name: "Lầu Ngọc Phí", comment: "Bài viết rất hay!", time: "10 phút trước" },
  { id: 2, name: "Hứa Vinh Thua", comment: "Cảm ơn bạn đã chia sẻ.", time: "20 phút trước" },
  { id: 3, name: "A ra pét", comment: "Mình sẽ áp dụng ngay!", time: "1 giờ trước" },
];

function CommentList() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách bình luận</h1>
      <div className="space-y-4">
        {comments.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white shadow rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
            <p className="text-gray-700">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentList;
