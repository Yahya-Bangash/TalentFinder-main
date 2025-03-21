'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJobTitle } from "../../../features/filter/candidateFilterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const JobTitleBox = () => {
    const { jobTitle } = useSelector((state) => state.candidateFilter) || {};
    const [getJobTitle, setJobTitle] = useState(jobTitle);
    const dispatch = useDispatch();
    const { t } = useTranslation('candidateListings');

    // Job title handler
    const jobTitleHandler = (e) => {
        setJobTitle(e.target.value);
    };

    // Dispatch job title to Redux store
    useEffect(() => {
        dispatch(addJobTitle(getJobTitle));
    }, [dispatch, getJobTitle]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('jobTitleBox.placeholder')}
                value={getJobTitle || ""}
                onChange={jobTitleHandler}
            />
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default JobTitleBox;
