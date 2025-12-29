export default function Footer() {
  return (
    <footer className="w-full ">
      <div className="max-w-2xl mx-auto px-10 py-8 border-t border-t-gray-300 dark:border-t-gray-700 flex flex-col gap-4">
        <p className="text-md">
          You can reach me via{" "}
          <a href="mailto:favouradebimpe63@gmail.com" className="font-bold">
            email
          </a>
          , or find me on{" "}
          <a href="https://x.com/Dacron4show" className="font-bold">
            Twitter
          </a>{" "}
          and{" "}
          <a href="https://github.com/Proton-number" className="font-bold">
            Github
          </a>
        </p>
      </div>
    </footer>
  );
}
