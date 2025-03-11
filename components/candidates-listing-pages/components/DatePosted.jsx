'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDatePostCheck } from "../../../features/candidate/candidateSlice";
import { addDatePost } from "../../../features/filter/candidateFilterSlice";

const DatePosted = () => {
  const { datePost } = useSelector((state) => state.candidate) || {};
  const { datePost: selectedDate } = useSelector((state) => state.candidateFilter) || {};
  const [selectedDatePost, setSelectedDatePost] = useState(selectedDate);
  const dispatch = useDispatch();

  // date post handler
  const datePostHandler = (e, id) => {
    const value = e.target.value;
    setSelectedDatePost(value);
    dispatch(addDatePostCheck(id));
  };

  // Update Redux store when selected date changes
  useEffect(() => {
    dispatch(addDatePost(selectedDatePost));
  }, [dispatch, selectedDatePost]);

  return (
    <ul className="ui-checkbox">
      {datePost?.map((item) => (
        <li key={item.id}>
          <label>
            <input
              value={item.value}
              onChange={(e) => datePostHandler(e, item.id)}
              type="radio"
              checked={item.value === selectedDatePost}
            />
            <span></span>
            <p>{item.name}</p>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default DatePosted;
