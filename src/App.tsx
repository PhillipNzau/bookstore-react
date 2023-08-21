import { useState, useEffect } from "react";
import "./App.css";
import { ApiResponse } from "./model/types";
import { Dialog } from "@headlessui/react";
function App() {
  const [bookId, setBookId] = useState<number>();
  const [book, setBook] = useState<ApiResponse[]>([]);
  const [selectedBook, setSelectedBook] = useState<ApiResponse>();
  const [loading, setLoading] = useState(true);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v2/books")
      .then((response) => response.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleSelectedBook = (bookId: number) => {
    if (bookId) {
      fetch(`http://127.0.0.1:3000/api/v2/books/${bookId}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedBook(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      return;
    }
  };

  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-center text-5xl text-indigo-600 uppercase font-bold">
        Book Store
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 ">
          {book.map((book: ApiResponse) => (
            <div
              className="border border-indigo-400 w-[200px] h-auto rounded-md p-2 hover:cursor-pointer hover:border-slate-100 transition-all duration-300 hover:-translate-y-1"
              onClick={() => handleSelectedBook(book.id)}
              key={book.id}
            >
              <div className="w-full h-40 overflow-hidden ">
                <img
                  src={book.image}
                  alt="well"
                  className="w-full h-full object-fill "
                />
              </div>
              <p className="text-lg font-bold">{book.title}</p>
              <p className="text-sm text-slate-400">{book.author.name}</p>
            </div>
          ))}
          <div
            className="flex flex-col items-center justify-center border border-indigo-400 w-[200px] h-auto rounded-md p-2 hover:cursor-pointer hover:border-slate-100 transition-all duration-300 hover:-translate-y-1"
            onClick={() => setIsOpen(true)}
          >
            <p className="text-8xl text-center text-gray-400">+</p>
            <p className="text-gray-400">Add Book</p>
          </div>
        </div>
      )}

      <div className=" gap-4 py-6 ">
        <h1 className="text-center text-5xl text-indigo-600 uppercase font-bold mb-10">
          {selectedBook ? "Selected Book" : "Select a book"}
        </h1>
        {selectedBook && (
          <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <div
              className="border border-indigo-400 w-[200px] h-auto rounded-md p-2 hover:cursor-pointer hover:border-slate-100 transition-all duration-300 hover:-translate-y-1"
              onClick={() => setBookId(selectedBook.id)}
              key={selectedBook.id}
            >
              <div className="w-full h-40 overflow-hidden ">
                <img
                  src={selectedBook.image}
                  alt="well"
                  className="w-full h-full object-fill "
                />
              </div>
              <p className="text-lg font-bold">{selectedBook.title}</p>
              <p className="text-sm text-slate-400">
                {selectedBook.author.name}
              </p>
            </div>
            <div>
              <p>
                <span className="font-bold"> Book Title: </span>{" "}
                {selectedBook.title}
              </p>
              <p>
                <span className="font-bold"> Author Name:</span>{" "}
                {selectedBook.author.name}
              </p>
              <p>
                <span className="font-bold"> Author Age: </span>{" "}
                {selectedBook.author.age}
              </p>
            </div>
          </div>
        )}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <Dialog.Title>Add New Book</Dialog.Title>
            <div>
              <form action=""></form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

export default App;
