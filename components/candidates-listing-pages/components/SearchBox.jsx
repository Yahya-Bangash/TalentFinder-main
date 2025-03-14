'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../../features/filter/candidateFilterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const SearchBox = () => {
    const { keyword } = useSelector((state) => state.candidateFilter);
    const [getKeyword, setKeyword] = useState(keyword);
    const { t } = useTranslation('candidateListings');

    const dispatch = useDispatch();

    // keyword handler
    const keywordHandler = (e) => {
        setKeyword(e.target.value);
    };

    // keyword dispatch
    useEffect(() => {
        dispatch(addKeyword(getKeyword));
    }, [dispatch, addKeyword, getKeyword]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('searchBox.placeholder')}
                onChange={keywordHandler}
                value={keyword}
            />
            <span className="icon flaticon-search-3"></span>
        </>
    );
};

export default SearchBox;
