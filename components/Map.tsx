
export default function GoogleMap() {
  return (
    <div className="w-full  h-[350px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2601.5820661027697!2d-121.78902612361556!3d49.30325967139586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54841110235767cb%3A0x93595c61e05f2c3b!2sVape%20Alchemist!5e0!3m2!1sen!2sin!4v1754774845541!5m2!1sen!2sin"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        className="w-full rounded-xl h-full"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
