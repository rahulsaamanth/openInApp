import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  schedule,
  settings,
  dashboard,
  transactions,
  user_icon,
} from "../assets"

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import SearchIcon from "@mui/icons-material/Search"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt"
import InventoryIcon from "@mui/icons-material/Inventory"

import { Bar, Doughnut } from "react-chartjs-2"

import Modal from "./Modal"

import {
  Chart,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
  ArcElement,
} from "chart.js"

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
  ArcElement
)

const Dashboard = ({ user, setUser }) => {
  const [data, setData] = useState([])
  const [isClicked, setIsClicked] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    youtube: "",
  })

  const navigate = useNavigate()

  const handleLogout = () => {
    setUser({})
    navigate("/")
  }

  useEffect(() => {
    async function requestData() {
      const url = "https://dummyjson.com/products"
      const response = await fetch(url)
      const result = await response.json()

      setData(result.products)
    }
    try {
      requestData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  const smartPhones = data.filter((item) => item.category === "smartphones")

  const labels = smartPhones.map((item) => item.title)

  const prices = smartPhones.map((item) => item.price)
  const stock = smartPhones.map((item) => item.stock)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Smartphones",
      },
    },
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "price",
        data: prices,
        backgroundColor: "#98D89E",
        borderRadius: "100px",
      },
      {
        label: "commodity",
        data: stock,
        backgroundColor: "#EE8484",
        borderRadius: "100px",
      },
    ],
  }

  const doughnutData = {
    labels: ["smartphones", "laptops", "groceries"],
    datasets: [
      {
        label: "Consolidated Commodity",
        data: [6, 15, 9],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
      },
    ],
  }
  console.log(profileDetails)

  return (
    <div className="h-screen w-full overflow-hidden bg-[#F8FAFF]">
      <aside className="fixed inset-y-0 overflow-x-hidden overflow-y-auto sm:block bg-[#4285f4] w-[280px] ml-14 my-10 rounded-lg text-white">
        <div className="w-full flex flex-col space-y-10">
          <h1 className="text-[38px] font-bold pl-12 pt-14">Board.</h1>
          <div className="flex items-center gap-6 justify-stretch pl-12 text-[24px] cursor-pointer font-bold">
            <img src={dashboard} />
            <p>Dashboard</p>
          </div>
          <div className="flex items-center gap-6 justify-stretch pl-12 text-[24px] cursor-pointer hover:font-bold">
            <img src={transactions} />
            <p>Transactions</p>
          </div>
          <div className="flex items-center gap-6 justify-stretch pl-12 text-[24px] cursor-pointer hover:font-bold">
            <img src={schedule} />
            <p>Schedules</p>
          </div>
          <div className="flex items-center gap-6 justify-stretch pl-12 text-[24px] cursor-pointer hover:font-bold">
            <img src={user_icon} />
            <p>Users</p>
          </div>
          <div className="flex items-center gap-6 justify-stretch pl-12 text-[24px] cursor-pointer hover:font-bold">
            <img src={settings} />
            <p>Settings</p>
          </div>
        </div>
        <footer className="pl-12 flex flex-col pt-56 gap-5">
          <h3 className="cursor-pointer">Help</h3>
          <h3 className="cursor-pointer">Contact Us</h3>
        </footer>
      </aside>

      <div className="pl-96 py-10 h-screen">
        <nav className="flex items-center justify-between px-20">
          <h1 className="text-[36px] font-bold">Dashboard</h1>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="h-12 rounded-xl pl-4"
            />
            <SearchIcon style={{ width: "40px", height: "40px" }} />
            <NotificationsNoneIcon style={{ width: "40px", height: "40px" }} />
            <img
              src={user.picture}
              className="w-[40px] h-[40px] rounded-full"
            />
            <button
              className="btn underline text-blue-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>
        <div className="mx-10 flex items-center justify-between py-5">
          <div className="border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl bg-white w-[300px] flex flex-col p-5">
            <div className="bg-[#98D89E] w-fit rounded-full p-1">
              <AttachMoneyIcon style={{ color: "white" }} />
            </div>
            <h3 className="font-semibold">Total Revenues</h3>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[18px]">
                ${data.reduce((sum, item) => (sum += item.price), 0)}
              </h1>
              <div className="w-fit p-1 bg-green-300 rounded-3xl">
                <p>+2.5%</p>
              </div>
            </div>
          </div>
          <div className="border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl bg-white w-[300px] flex flex-col p-5">
            <div className="bg-[#ecf865] w-fit rounded-full p-1">
              <StarBorderIcon style={{ color: "white" }} />
            </div>
            <h3 className="font-semibold">Overall Rating</h3>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[18px]">
                {(
                  data.reduce((sum, item) => (sum += item.rating), 0) /
                  data.length
                ).toFixed(2)}
              </h1>
              <div className="w-fit p-1 bg-green-300 rounded-3xl">
                <p>+1.7%</p>
              </div>
            </div>
          </div>
          <div className="border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl bg-white w-[300px] flex flex-col p-5">
            <div className="bg-[#dd65f8] w-fit rounded-full p-1">
              <ThumbUpOffAltIcon style={{ color: "white" }} />
            </div>
            <h3 className="font-semibold">Total Commodity</h3>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[18px]">
                {data.reduce((sum, item) => (sum += item.stock), 0)}
              </h1>
              <div className="w-fit p-1 bg-green-300 rounded-3xl">
                <p>+1.4%</p>
              </div>
            </div>
          </div>
          <div className="border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl bg-white w-[300px] flex flex-col p-5">
            <div className="bg-[#65b1f8] w-fit rounded-full p-1">
              <InventoryIcon style={{ color: "white" }} />
            </div>
            <h3 className="font-semibold">Total Items</h3>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-[18px]">{data.length}</h1>
              <div className="w-fit p-1 bg-green-300 rounded-3xl">
                <p>+4.4%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-10 border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl py-10 px-10 bg-white">
          <h1 className="text-[24px] font-bold">Price-commodity</h1>
          <Bar
            data={chartData}
            options={options}
            width={`auto`}
            height={`55px`}
          />
        </div>
        <div className="w-full flex items-center justify-between py-6 px-10 gap-6">
          <div className="border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl px-10 bg-white">
            <Doughnut
              data={doughnutData}
              options={options}
              width={`200px`}
              height={`200px`}
            />
          </div>
          <div className="flex-1 border-[3px] border-gray-200 shadow-md shadow-gray-200 rounded-2xl px-10 bg-white grid place-items-center h-[200px]">
            <div
              onClick={() => setIsClicked(!isClicked)}
              className="bg-[#F8FAFF] text-[38px] text-black p-6 rounded-2xl cursor-pointer"
            >
              +
            </div>
            <p>Add Profile...</p>
            <Modal
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              setProfileDetails={setProfileDetails}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
