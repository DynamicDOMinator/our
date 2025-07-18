"use client";
import Image from "next/image";
import MarqueeSection from "../components/MarqueeSection";
import { motion } from "framer-motion";


export default function () {
  return (
    <div>
      <div className="lg:min-h-screen md:pt-48 pt-30 md:pl-16 pl-10 ">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1.3,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="text-3xl md:text-5xl lg:text-9xl italic "
        >
          Creativity <br /> Engineered with Intelligence 🤖
        </motion.h1>
      </div>

      <div className="mt-20 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Image
            className="w-full h-full object-cover"
            src="/team.jpg"
            alt="team"
            width={1000}
            height={1000}
          />
        </motion.div>
      </div>

      <div className="flex lg:flex-row flex-col items-start pl-8 lg:pl-0 justify-center gap-20  lg:pt-40 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="lg:text-2xl text-xl "
        >
          <h2>Our goal</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="pr-3 lg:pr-0"
        >
          <p className="lg:text-2xl text-xl lg:max-w-3xl">
            Since day one, we've been dedicated to helping our clients discover
            powerful solutions tailored to their business needs. From building
            standout brands to crafting seamless digital products, we turn ideas
            into impact. With every project, our expertise grows — allowing us
            to deliver work that's not only effective, but exactly how it should
            be
          </p>
        </motion.div>
      </div>

      <div className="flex  px-10 lg:px-0 pt-30 lg:flex-row flex-col items-center gap-10 pb-30 max-w-[1200px] justify-center mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
        >
          <Image
            className="h-[600px] object-cover rounded-4xl"
            src="/team1.jpg"
            alt="team"
            width={500}
            height={200}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="lg:pt-[300px]"
        >
          <Image
            className="h-[600px] object-cover rounded-4xl "
            src="/team2.jpg"
            alt="team"
            width={500}
            height={200}
          />
        </motion.div>
      </div>

      <div>
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="text-3xl  pl-8 lg:pl-16 md:text-5xl lg:text-9xl italic pb-20"
        >
          Simply put, we create <br /> what{" "}
          <span className="font-[100]">others fear</span>
        </motion.h3>

        <div className="lg:px-20 px-10">
          <hr />
        </div>

        <div>
          <div className="flex lg:flex-row flex-col items-start pl-8 lg:pl-0 justify-center gap-20  lg:pt-20 pt-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              viewport={{ once: true }}
              className="lg:text-2xl text-xl "
            >
              <h2>
                Simply put, we create <br />
                what others fear
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              viewport={{ once: true }}
              className=" pr-3 lg:pr-0"
            >
              <p className="lg:text-2xl text-xl lg:max-w-3xl">
                At Prosental, we don't shy away from challenges — we chase them.
                Whether it's a complex platform, a bold brand concept, or an
                ambitious digital product, we step in when others step back.
                We're not here to play it safe. We're here to build what's never
                been built, solve what others avoid, and make digital
                experiences that stand out — not just fit in. As a startup, we
                bring agility, passion, and sharp thinking to every project. We
                move fast, think smart, and care deeply — because to us,
                innovation isn't optional. It's the only way forward
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pt-20 md:px-20 px-10 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
        >
          <Image
            className="w-full h-full rounded-[70px]  object-cover"
            src="/team4.jpg"
            alt="team"
            width={1000}
            height={1000}
          />
        </motion.div>
      </div>
      <MarqueeSection />
      <div className="mt-7 bg-black rounded-r-[300px] ">
        <motion.h4
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl lg:text-9xl  italic text-white pl-8 lg:pl-16 pt-30"
        >
          Benefits of <br />
          working with us
        </motion.h4>
        <div className="border-b-2 border-white mx-16 pt-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="py-20 border-b-2 border-white mx-16 text-white"
        >
          <h4 className="lg:text-2xl text-xl text-red-300">
            Time zones don't slow us down
          </h4>
          <p className="lg:text-4xl  md:text-2xl text-xl pt-10">
            No matter where you're located, working with us feels effortless.
            Our team is flexible, responsive, and built to collaborate across
            borders. Clear communication, fast turnarounds, and full
            transparency — that's how we make distance feel like nothing
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="py-20 border-b-2 border-white mx-16 text-white"
        >
          <h4 className="lg:text-2xl text-xl text-blue-300">
            No limits. Just solutions
          </h4>
          <p className="lg:text-4xl  md:text-2xl text-xl pt-10">
            If it's complex, challenging, or considered "impossible" — that's
            exactly where we shine. We bring ideas to life exactly as envisioned
            — no shortcuts, no compromises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="py-20 border-b-2 border-white mx-16 text-white"
        >
          <h4 className="lg:text-2xl text-xl text-green-300">
            Work terms that work for you
          </h4>
          <p className="lg:text-4xl  md:text-2xl text-xl pt-10">
            We offer clear, flexible engagement models to match your needs.
            Whether you're building fast or scaling slow, we'll shape the
            process to fit — and stick to what we agree.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.5,
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          viewport={{ once: true }}
          className="py-20  mx-16 text-white"
        >
          <h4 className="lg:text-2xl text-xl text-orange-300">
            All-in-one digital solutions
          </h4>
          <p className="lg:text-4xl  md:text-2xl text-xl pt-10 pr-10 lg:pr-0">
            From idea to execution, we've got you covered. Whether you need
            brand identity, UI/UX design, custom development, technical support,
            or go-to-market strategy — we bring it all together under one roof.
            Whatever your business needs, we deliver — with clarity, creativity,
            and code that works.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
