import React from 'react'

function CustomButton({btnType, title, handleClick, styles, blocker}) {

  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles} ${blocker && 'cursor-not-allowed'}`}
      onClick={handleClick}
      disabled={blocker}
      >
      {title}
    </button>
  )
}

export default CustomButton