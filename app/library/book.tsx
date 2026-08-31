import { useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";

import type { Book } from "@/types/book";
import cn from "@/utils/cn";
import Icon from "@/components/ui/icon";

type Props = {
  book: Book;
};

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export default function BookItem({ book }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemPosition, setItemPosition] = useState({ top: 0, left: 0 });
  const itemRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (open && itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setItemPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });
    }
    setIsOpen(open);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild ref={itemRef}>
        <button
          className={cn(
            isOpen ? "invisible" : "",
            "group relative flex w-full flex-col rounded-[20px] bg-gray-950 p-4 text-left focus:outline-hidden",
          )}
        >
          <Icon
            name="arrows-expand"
            className="invisible absolute top-2.5 right-2.5 text-gray-500 focus:outline-hidden group-hover:visible"
          />
          <span className="w-full truncate text-gray-50">{book.title}</span>
          <span className="mt-2 text-gray-500 text-sm">{book.creator}</span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <motion.div
              variants={overlayVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
            />

            <Dialog.Overlay className="overflow-y-auto">
              <Dialog.Content
                className="fixed inset-0 z-50 flex items-center justify-center"
                forceMount
              >
                <motion.div
                  initial={{
                    position: "fixed",
                    top: itemPosition.top,
                    left: itemPosition.left,
                    x: "-50%",
                    y: "-50%",
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    top: "50%",
                    left: "50%",
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    top: itemPosition.top,
                    left: itemPosition.left,
                    scale: 0.2,
                    opacity: 0,
                  }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                  }}
                  className="z-50 h-full w-full overflow-hidden overflow-y-auto bg-gray-1000 p-8 sm:h-fit sm:max-h-[60vh] sm:w-[90vw] sm:max-w-lg sm:rounded-[20px] sm:bg-gray-950/80"
                >
                  {book.cover ? (
                    <div className="relative w-[100px] h-[150px] mx-auto">
                      <Image
                        src={book.cover}
                        alt="0x6A6471"
                        fill
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAACWCAQAAACCseXNAAAAkklEQVR42u3PAREAAAQEMF9FUdUVkMBtDZaeeiEiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIpcF/aVe7QArWMoAAAAASUVORK5CYII="
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <Icon
                      name="book"
                      size="100"
                      variant="filled"
                      className="mx-auto rounded-md"
                    />
                  )}
                  <Dialog.Title className="mx-auto mt-8 max-w-xs text-center font-medium text-gray-50 text-lg">
                    {book.title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-4 text-gray-500">
                    {book.description}
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-2.5 right-2.5 rounded-lg p-1 text-gray-500 hover:bg-black focus:outline-hidden"
                      aria-label="Close"
                    >
                      <Icon name="x" />
                    </button>
                  </Dialog.Close>
                </motion.div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
