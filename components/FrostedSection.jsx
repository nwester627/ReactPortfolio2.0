export default function FrostedSection({ children, className = "" }) {
  return (
    <section
      className={`
        w-11/12 sm:w-9/12 mx-auto 
        px-4 py-8 mt-8 
        rounded-2xl border border-white/10 
        bg-white/5 backdrop-blur-sm 
        shadow-md shadow-black/10
        ${className}
      `}
    >
      {children}
    </section>
  );
}
