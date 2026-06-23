import { useState, useEffect } from "react";
import CompanionFace from "./Face";
import { AnimatePresence, motion } from "framer-motion";
import VoiceWaves from "./VoiceWaves";

export default function StudyCompanion() {
  const [screen, setScreen] = useState("welcome");
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [faceMood, setFaceMood] = useState("happy");

  const delays = {
    menu: 200,
    question: 400,
    profile: 2500,
    recommendation: 1500,
    correction: 1000,
    results: 2500,
    qr: 1200,
  };

  const next = (target) => {
    const texts = {
      menu: "Getting started...",
      question: "Preparing conversation...",
      profile: "Analyzing your interests...",
      recommendation: "Finding suitable studies...",
      correction: "Updating profile...",
      results: "Generating matches...",
      qr: "Preparing QR code...",
    };

    setLoadingText(texts[target]);
    setLoading(true);

    setTimeout(() => {
      setScreen(target);
      setLoading(false);
    }, delays[target]);
  };

  useEffect(() => {
    const moodMap = {
      welcome: "happy",
      menu: "happy",
      question: "listening",
      profile: "thinking",
      recommendation: "thinking",
      correction: "neutral",
      results: "happy",
      qr: "happy",
    };

    setFaceMood(moodMap[screen] ?? "happy");
  }, [screen]);

  return (
    <div className="w-screen min-h-screen overflow-hidden bg-slate-50 text-slate-900 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <div
          className="
            w-full
            h-full
            bg-white
            flex
            flex-col
            p-6
            md:p-10
            lg:p-12
          "
        >
          
          {loading ? (
            <LoadingScreen loadingText={loadingText}/>
          ) : (
            <>
              {screen === "welcome" && (
                <Screen>
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="flex justify-center items-center mb-10">
                      <CompanionFace mood="happy" />
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-light mb-4 mt-10">
                      Discover your future
                    </h1>

                    <p className="text-slate-500 text-base md:text-lg lg:text-xl max-w-md">
                      Find a study that matches your interests,
                      personality and goals.
                    </p>
                  </div>

                  <button
                    onClick={() => next("menu")}
                    className="bg-teal-500 hover:bg-teal-600 text-white rounded-2xl py-4 md:p-6 text-lg md:text-xl mt-8"
                  >
                    Touch to Start
                  </button>
                </Screen>
              )}
              {screen === "menu" && (
                <Screen>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-10">
                    How can I help you today?
                  </h1>

                  <div className="space-y-4 flex-1">
                    <button className="w-full border rounded-2xl p-4 md:p-6 text-lg md:text-xl text-left">
                      Explore studies
                    </button>

                    <button
                      onClick={() => next("question")}
                      className="w-full border rounded-2xl p-4 md:p-6 text-lg md:text-xl text-left"
                    >
                      What suits me?
                    </button>

                    <button className="w-full border rounded-2xl p-4 md:p-6 text-lg md:text-xl text-left">
                      Ask a question
                    </button>
                  </div>

                  <p className="text-slate-400 text-base md:text-lg lg:text-xl mt-8">
                    🔒 Nothing is stored after you leave
                  </p>
                </Screen>
              )}

              {screen === "question" && (
                <Screen>
                  <div className="flex justify-center items-center mb-10">
                    <CompanionFace mood="listening" />
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-4xl font-light mb-6">
                      What brought you here today?
                    </h2>

                    <p className="text-slate-500 text-base md:text-lg lg:text-xl mb-12">
                      You can speak freely.
                      There are no wrong answers.
                    </p>

                    <div className="flex justify-center">
                      <div className="flex flex-col items-center gap-8">

                        <VoiceWaves />

                        <button
                          onClick={() => next("profile")}
                          className="
                            w-32
                            h-32
                            rounded-full
                            bg-teal-500
                            text-white
                            text-7xl
                            shadow-lg
                          "
                        >
                          ✓
                        </button>

                      </div>
                    </div>
                  </div>
                  <button
                      onClick={() => next("menu")}
                      className="text-slate-400 md:p-6 text-lg md:text-xl mt-8"
                    >
                      Exit
                    </button>
                </Screen>
              )}

              {screen === "profile" && (
                <Screen>
                  <div className="flex justify-center items-center mb-10">
                    <CompanionFace mood="thinking" />
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-10">
                    Here's what I'm learning about you
                  </h1>

                  <div className="space-y-4 md:space-y-6 flex-1">

                    <Trait name="Creative" value={80} />
                    <Trait name="Analytical" value={55} />
                    <Trait name="Social" value={85} />
                    <Trait name="Practical" value={40} />

                    <div className="pt-8">
                      <p className="mb-2 text-base md:text-lg lg:text-xl">Profile confidence</p>

                      <div className="h-3 bg-slate-200 rounded-full">
                        <div className="h-3 bg-teal-500 rounded-full w-[65%]" />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => next("recommendation")}
                    className="bg-teal-500 text-white py-4 md:p-6 text-lg md:text-xl rounded-2xl mt-8"
                  >
                    Continue
                  </button>
                </Screen>
              )}

              {screen === "recommendation" && (
                <Screen>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-8">
                    Recommended study
                  </h1>

                  <div className="border rounded-3xl p-8 flex-1">

                    <h2 className="text-3xl font-semibold mb-6">
                      Communication & Multimedia Design
                    </h2>

                    <div className="space-y-3 text-base md:text-lg lg:text-xl">
                      <p>✓ Creative projects</p>
                      <p>✓ Visual communication</p>
                      <p>✓ Working with people</p>
                    </div>

                    <p className="mt-8 text-teal-600 text-base md:text-lg lg:text-xl">
                      Match confidence: 82%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <button className="border rounded-2xl py-4 md:p-6 text-lg md:text-xl">
                      Tell me more
                    </button>

                    <button
                      onClick={() => next("correction")}
                      className="border rounded-2xl py-4 md:p-6 text-lg md:text-xl"
                    >
                      That's not me
                    </button>
                  </div>
                </Screen>
              )}

              {screen === "correction" && (
                <Screen>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-6">
                    Good catch.
                  </h1>

                  <p className="text-slate-500 text-base md:text-lg lg:text-xl mb-10">
                    I'll update that.
                  </p>

                  <div className="space-y-4 flex-1">
                    <button className="border rounded-xl p-4 md:p-6 text-lg md:text-xl text-left mr-4">
                      Creative
                    </button>

                    <button className="border rounded-xl p-4 md:p-6 text-lg md:text-xl text-left mr-4">
                      Analytical
                    </button>

                    <button className="border rounded-xl p-4 md:p-6 text-lg md:text-xl text-left mr-4">
                      Social
                    </button>

                    <button className="border rounded-xl p-4 md:p-6 text-lg md:text-xl text-left mr-4">
                      Practical
                    </button>
                  </div>

                  <button
                    onClick={() => next("results")}
                    className="bg-teal-500 text-white py-4 md:p-6 text-lg md:text-xl rounded-2xl mt-8"
                  >
                    Update Profile
                  </button>
                </Screen>
              )}
              {screen === "results" && (
                <Screen>
                  <div className="flex justify-center items-center mb-10">
                    <CompanionFace mood="happy" />
                  </div>
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-8">
                    Your top matches
                  </h1>

                  <div className="space-y-4 flex-1">
                    <Result title="Communication & Multimedia Design" score="82%" />
                    <Result title="Applied Data Science & AI" score="78%" />
                    <Result title="Psychology" score="74%" />
                  </div>

                  <button
                    onClick={() => next("qr")}
                    className="bg-teal-500 text-white py-4 md:p-6 text-lg md:text-xl rounded-2xl mt-8"
                  >
                    Continue
                  </button>
                </Screen>
              )}

              {screen === "qr" && (
                <Screen>
                  <div className="flex-1 flex flex-col justify-center items-center">

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-light mb-8">
                      Continue on your phone
                    </h1>

                    <div className="w-56 h-56 border-2 border-dashed rounded-2xl flex items-center justify-center">
                      <img className="w-54 h-54 rounded-2x1" src="./qrcode.png"></img>
                    </div>

                    <p className="text-slate-500 text-base md:text-lg lg:text-xl mt-8 text-center">
                      Review your results later.<br />
                      Resume the conversation anytime.
                    </p>
                  </div>
                </Screen>
              )}
            </>
          )}

          </div>
        </AnimatePresence>
    </div>
  );
}

function Trait({ name, value }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span>{name}</span>
        <span>{value}%</span>
      </div>

      <div className="h-3 bg-slate-200 rounded-full">
        <div
          className="h-3 bg-teal-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function Result({ title, score }) {
  return (
    <div className="border rounded-2xl p-6 flex justify-between">
      <span>{title}</span>
      <span className="text-teal-600">{score}</span>
    </div>
  );
}

function Screen({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="h-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}

function LoadingScreen({ loadingText }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        h-full
        flex
        flex-col
        items-center
        justify-center
        gap-8
      "
    >
      <CompanionFace mood="thinking" />

      <p className="text-slate-500 text-lg">
        {loadingText}
      </p>
    </motion.div>
  );
}
