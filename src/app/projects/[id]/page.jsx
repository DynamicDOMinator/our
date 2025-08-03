import Image from "next/image";
export default function () {
  return (
    <div>
      <div className="pt-52 px-20">
        <h1 className="text-7xl text-center italic font-semibold">
          CyberXbyts
        </h1>

        <p className="text-3xl pt-10 text-center italic">
          CTF Platform for Cybersecurity Enthusiasts
        </p>
      </div>

      <div className="relative w-full lg:h-[700px] h-[300px] pt-40 px-20">
        <video
          src="/p1-v.mp4"
          autoPlay
          loop
          muted
          className=" w-full h-full object-cover"
        />
      </div>

      <div className="flex items-start max-w-[1000px] gap-10 mx-auto text-2xl mt-20">
        <div className="min-w-[200px]">
          <p>The challenge</p>
        </div>
        <div className="">
          <p>
            For several years we’ve been helping Punto Pago explore new digital
            marketing niches. During this time they have worked their way from
            being a utility bills payment service to launching a superapp as
            well as a whole Punto Pago ecosystem with bank cards, loans,
            payments and a marketplace.
          </p>
          <p className="pt-10">
            Launching the product helped increase average revenue per user by
            growing the size of the basket of consumer goods. Punto Pago
            provides multiple services, including payments, spending's control
            and fast delivery marketplace. A lot of services into an instant
            place that give you access to a range of useful services just in one
            tap.
          </p>
        </div>
      </div>

      <div className="px-20 pt-20">
        <Image
          className="w-full object-cover rounded-2xl"
          src={"/p1-1.png"}
          alt="p1-1"
          width={1000}
          height={1000}
        />
        <Image
          className="w-full object-cover pt-10 rounded-2xl"
          src={"/p1-2.png"}
          alt="p1-2"
          width={1000}
          height={1000}
        />
        <Image
          className="w-full object-cover pt-10 rounded-2xl"
          src={"/p1-3.png"}
          alt="p1-3"
          width={1000}
          height={1000}
        />
      </div>

      <div className="pt-40 max-w-[900px] mx-auto font-semibold">
        <h2 className="text-7xl text-left border-b-2 border-black pb-10 ">
          Multi-service platform <br />
          and fintech app
        </h2>
      </div>

      <div className="flex items-start max-w-[1000px] gap-10 mx-auto text-2xl mt-20">
        <div className="min-w-[200px]">
          <p>Punto Pago is not just an app</p>
        </div>
        <div className="">
          <p>
            Punto Pago provides multiple services, including payments, spendings
            control and fast delivery marketplace. We have explored the best
            scaling options considering growth and focused on not just consumer
            numbers, but transaction numbers.
          </p>
        </div>
      </div>

      <div className="px-20 pt-10">
        <Image
          className="w-full object-cover pt-10 rounded-2xl" 
          src={"/p1-4.png"}
          alt="p1-3"
          width={1000}
          height={1000}
        />
      </div>

      <div className="flex gap-10 max-w-[1000px] mx-auto pb-30">
        <div className="flex flex-col ] gap-10   mt-20 ">
          <div className="w-[450px] rounded-4xl h-[750px] relative bg-red-200 p-10">
            <Image
              className="w-full h-full rounded-3xl   pt-10"
              src={"/p1-5.png"}
              alt="p1-6"
              width={1000}
              height={1000}
            />
          </div>
          <div className="w-[450px] rounded-4xl h-[750px] relative bg-amber-200 p-10">
            <Image
              className="w-full h-full rounded-3xl   pt-10"
              src={"/p1-5.png"}
              alt="p1-6"
              width={1000}
              height={1000}
            />
          </div>
          <div className="w-[450px] rounded-4xl h-[750px] relative bg-cyan-200 p-10">
            <Image
              className="w-full h-full rounded-3xl   pt-10"
              src={"/p1-5.png"}
              alt="p1-6"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="flex flex-col  gap-10   mt-20 pt-50">
          <div className="w-[450px] rounded-4xl h-[750px] relative bg-blue-200 p-10">
            <Image
              className="w-full h-full rounded-3xl   pt-10"
              src={"/p1-5.png"}
              alt="p1-6"
              width={1000}
              height={1000}
            />
          </div>
          <div className="w-[450px] rounded-4xl h-[750px] relative bg-green-200 p-10">
            <Image
              className="w-full h-full rounded-3xl   pt-10"
              src={"/p1-5.png"}
              alt="p1-6"
              width={1000}
              height={1000}
            />
          </div>
          <div className="w-[450px] rounded-4xl h-[750px] relative bg-orange-200 p-10">
            <Image
              className="w-full h-full rounded-3xl   pt-10"
              src={"/p1-5.png"}
              alt="p1-6"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
