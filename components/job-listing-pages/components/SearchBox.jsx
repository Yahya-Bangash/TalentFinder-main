'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/filterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const SearchBox = () => {
    const { jobList } = useSelector((state) => state.filter);
    const [getKeyWord, setKeyWord] = useState(jobList.keyword);
    const dispath = useDispatch();
    const { t } = useTranslation('jobListings');

    // keyword handler
    const keywordHandler = (e) => {
        dispath(addKeyword(e.target.value));
    };

    useEffect(() => {
        setKeyWord(jobList.keyword);
    }, [setKeyWord, jobList]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('searchBox.placeholder')}
                value={getKeyWord}
                onChange={keywordHandler}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
