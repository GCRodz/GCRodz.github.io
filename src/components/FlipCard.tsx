 export default function FlipCard({
   front,
   back,
   className = '',
 }: {
   front: ReactNode;
   back: ReactNode;
   className?: string;
 }) {
   const [flipped, setFlipped] = useState(false);

   return (
-    <div
-      className={`relative cursor-pointer [perspective:1000px] ${className}`}
+    <div
+      className={`relative cursor-pointer h-full w-full [perspective:1000px] ${className}`}
       onClick={() => setFlipped((f) => !f)}
     >
       <div
         className={`transition-transform duration-500 [transform-style:preserve-3d] ${
           flipped ? 'rotate-y-180' : ''
         }`}
       >
-        <div className="absolute inset-0 [backface-visibility:hidden]">
+        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
           {front}
         </div>
-        <div className="absolute inset-0 rotate-y-180 [backface-visibility:hidden]">
+        <div className="absolute inset-0 h-full w-full rotate-y-180 [backface-visibility:hidden]">
           {back}
         </div>
       </div>
     </div>
   );
 }
