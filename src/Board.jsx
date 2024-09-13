import React, { useState } from "react";
import Confetti from "react-confetti";
import Tooltip from "@mui/material/Tooltip";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import LoadingSpinner from "./Loaders";
import rocket from "../src/assets/rocket.png";
import trophy from "../src/assets/trophy.png";
import well_played from "../src/assets/well-played.png";

const Board = () => {
  const [boardVaArr, setBoardValArr] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);
  const [start, setStart] = useState(true);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  let width = window.innerWidth - 20;
  let height = window.innerHeight - 10;

  const winingCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];

  const findWinner = () => {
    for (let i = 0; i < winingCondition.length; i++) {
      const [a, b, c] = winingCondition[i];
      if (boardVaArr[a] === boardVaArr[b] && boardVaArr[b] === boardVaArr[c]) {
        if (boardVaArr[a] === "X" || boardVaArr[a] === "O")
          setWinner(boardVaArr[a]);
      }
    }
  };

  const handleClick = (ind) => {
    if (boardVaArr[ind] === null) {
      boardVaArr[ind] = xTurn ? "X" : "O";
      setBoardValArr(boardVaArr);
      setXTurn(!xTurn);
      findWinner();
    }
    if (
      boardVaArr.every((ele) => ele !== null) &&
      winner !== "X" &&
      winner !== "O"
    ) {
      setDraw(true);
    }
  };

  const renderBoardCell = (ind) => {
    return (
      <div
        className={`glowO h-20 w-20 bg-[rgb(30,12,56)] flex justify-center items-center text-white font-[400] text-5xl rounded-lg  cursor-pointer `}
        onClick={() => handleClick(ind)}
      >
        {boardVaArr[ind]}
      </div>
    );
  };

  const playAgain = () => {
    setLoading(true);
    setWinner("");
    setBoardValArr(Array(9).fill(null));
    setDraw(false);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleStart = () => {
    setLoading(true);
    setStart(false);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div
      className={`flex flex-col h-[100vh] w-full justify-center items-center bg-[url('./assets/bg.webp')]`}
    >
      {loading ? (
        <div className="w-full h-full flex justify-center items-center fixed bg-[#73549fcc] bg-opacity-60 via-transparent">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {" "}
          <div className="flex justify-between w-[250px] m-8">
            <div className="bg-slate-100 w-[180px] flex h-[40px] rounded-xl shadow-[2px_4px_20px_5px_#040448]">
              <p
                className={`flex-1 rounded-xl m-[1px] flex justify-center items-center transition-all duration-300 ease-in-out ${
                  xTurn
                    ? "glowX bg-[rgb(30,12,56)] text-white font-semibold border"
                    : "text-[rgb(30,12,56)] font-semibold"
                }`}
              >
                X Turn
              </p>
              <p
                className={`flex-1 rounded-xl m-[1px] flex justify-center items-center transition-all duration-300 ease-in-out ${
                  !xTurn
                    ? "glowX bg-[rgb(30,12,56)] text-white font-semibold border"
                    : "text-[rgb(30,12,56)] font-semibold"
                }`}
              >
                O Turn
              </p>
            </div>

            <Tooltip
              title={boardVaArr.some((ele) => ele !== null) ? "Restart" : ""}
              placement="right"
            >
              <button
                className="h-10 w-10 bg-[rgb(30,12,56)] rounded-xl text-white rotate-360 disabled:bg-slate-400 disabled:text-gray-300"
                onClick={() => setReset(true)}
                disabled={boardVaArr.every((ele) => ele === null)}
              >
                <ReplayOutlinedIcon />
              </button>
            </Tooltip>
          </div>
          <div className=" ">
            <div className="flex gap-2 my-2 ">
              {renderBoardCell(0)}
              {renderBoardCell(1)}
              {renderBoardCell(2)}
            </div>
            <div className="flex gap-2 my-2">
              {renderBoardCell(3)}
              {renderBoardCell(4)}
              {renderBoardCell(5)}
            </div>
            <div className="flex gap-2 my-2">
              {renderBoardCell(6)}
              {renderBoardCell(7)}
              {renderBoardCell(8)}
            </div>
          </div>{" "}
        </>
      )}

      {start && (
        <div className="w-full h-full flex justify-center items-center fixed bg-[#73549fcc] bg-opacity-60 via-transparent ">
          <div className="w-[400px] h-[500px] flex flex-col justify-center items-center ">
            <p className="text-6xl font-bold text-white text_shadow">
              {" "}
              Tic Tac Toe
            </p>

            <img src={rocket} alt="rocket" className="h-[150px] m-7 " />

            <button
              className="px-6 py-2 bg-[rgb(30,12,56)] glowO border text-white rounded-xl m-6"
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      )}

      {reset && (
        <div className="w-full h-full flex justify-center items-center fixed bg-[#73549fcc] bg-opacity-60 via-transparent ">
          <div className=" bg-[rgb(30,12,56)] text-white px-6 py-5 rounded-xl box_shadow ">
            <h1 className="text-center mb-2 text-2xl">Are you sure ?</h1>
            <p className="my-3">Are you sure you want to start over ?</p>
            <div className="flex flex-row justify-between mt-6">
              <button
                className="px-3 py-1 bg-[rgb(30,12,56)] glowX border text-white rounded-lg"
                onClick={() => {
                  setReset(false);
                }}
              >
                No
              </button>
              <button
                className="px-3 py-1 bg-[rgb(30,12,56)] glowO border text-white rounded-lg"
                onClick={() => {
                  setBoardValArr(Array(9).fill(null));
                  setReset(false);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {winner && (
        <div className="w-full h-full flex justify-center items-center fixed bg-[#73549fcc] bg-opacity-60 via-transparent ">
          <div className="w-[400px] h-[500px] flex flex-col justify-center items-center ">
            <p className="text-4xl font-bold text-white text_shadow">
              {winner} is Winner
            </p>
            <img src={trophy} alt="trophy" className="h-[150px] m-6 " />
            <button
              className="px-5 py-3 bg-[rgb(30,12,56)] glowO border text-white rounded-xl "
              onClick={playAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {winner && (
        <div>
          <Confetti width={width} height={height} />
        </div>
      )}

      {draw && !winner && (
        <div className="w-full h-full flex justify-center items-center fixed bg-[#73549fcc] bg-opacity-60 via-transparent ">
          <div className="w-[400px] h-[500px] flex flex-col justify-center items-center ">
            <p className="text-4xl font-bold text-white text_shadow">
              It's a draw !
            </p>
            <img
              src={well_played}
              alt="well_played"
              className="h-[150px] m-6 "
            />
            <button
              className="px-5 py-3 bg-[rgb(30,12,56)] glowO border text-white rounded-xl m-6"
              onClick={playAgain}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
