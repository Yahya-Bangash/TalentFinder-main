'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/employerFilterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const SearchBox = () => {
    const { keyword } = useSelector((state) => state.employerFilter);
    const [getKeyWord, setkeyWord] = useState(keyword);
    const dispath = useDispatch();
    const { t } = useTranslation('companyListings');

    // keyword handler
    const keywordHandler = (e) => {
        dispath(addKeyword(e.target.value));
    };

    useEffect(() => {
        setkeyWord(keyword);
    }, [setkeyWord, keyword]);

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
