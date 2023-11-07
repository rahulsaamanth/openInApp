import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"

const Modal = ({
  isClicked,
  setIsClicked,
  profileDetails,
  setProfileDetails,
  setSubmitted,
}) => {
  if (!isClicked) {
    return <></>
  }
  const handleChange = (e) => {
    const { target } = e
    const { name, value } = target
    setProfileDetails({
      ...profileDetails,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const tabs = ["basic", "socials"]
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  return (
    <div
      onClick={() => setIsClicked(false)}
      className="fixed inset-0 bg-black/50 cursor-pointer overflow-y-scroll grid place-items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[700px] mx-auto my-8 px-8 cursor-default bg-white rounded-2xl"
      >
        <div className="border-b-2 flex items-center justify-between py-4">
          <h1 className="font-semibold text-[24px]">Add New Profile</h1>
          <button
            onClick={() => setIsClicked(false)}
            className="btn text-gray-500 text-[24px]"
          >
            x
          </button>
        </div>
        <div className="flex items-center justify-around">
          {tabs.map((tab) => (
            <div>
              <div
                key={tab}
                className={`text-[18px] font-semibold cursor-pointer text-center py-2 px-6`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </div>
              <div
                className={`w-[200px] h-[5px] rounded-3xl ${
                  selectedTab === tab ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            </div>
          ))}
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {selectedTab === "basic" && (
                <form className="px-10 flex flex-col justify-center gap-4 py-6">
                  <div className="flex flex-col justify-center gap-2">
                    <label htmlFor="Name">
                      Enter Name<sup>*</sup>
                    </label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Eg.John Doe"
                      required
                      onChange={handleChange}
                      className="outline-none border border-gray-400 rounded-md pl-2 h-9"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <label htmlFor="Name">
                      Enter Email<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      name="Name"
                      onChange={handleChange}
                      placeholder="Eg.Johndoe@example.com"
                      required
                      className="outline-none border border-gray-400 rounded-md pl-2 h-9"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <label htmlFor="Name">
                      Enter Phone<sup>*</sup>
                    </label>
                    <input
                      type="number"
                      name="Name"
                      onChange={handleChange}
                      placeholder="Eg.7993174492"
                      required
                      className="outline-none border border-gray-400 rounded-md pl-2 h-9"
                    />
                  </div>
                  <div className="flex items-center justify-end py-8">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedTab("socials")
                      }}
                      className="btn bg-blue-600 text-white font-semibold text-[18px] w-24 rounded-md"
                    >
                      Next
                    </button>
                  </div>
                </form>
              )}

              {selectedTab === "socials" && (
                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="px-10 flex flex-col justify-center gap-4 py-6"
                  >
                    <div className="flex flex-col justify-center gap-2">
                      <label htmlFor="Name">
                        Instagram Link<sup>(optional)</sup>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="Name"
                        placeholder="Eg.instagram.com/username"
                        className="outline-none border border-gray-400 rounded-md pl-2 h-9"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                      <label htmlFor="Name">
                        Youtube Link<sup>(optional)</sup>
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="Name"
                        placeholder="Eg.youtube.com/username"
                        className="outline-none border border-gray-400 rounded-md pl-2 h-9"
                      />
                    </div>

                    <div className="flex items-center justify-end py-8 space-x-3">
                      <button
                        onClick={() => setSelectedTab("basic")}
                        className="btn bg-white border border-gray-400 font-semibold text-[18px] w-24 rounded-md"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn bg-blue-600 text-white font-semibold text-[18px] w-24 rounded-md"
                      >
                        Done
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Modal
