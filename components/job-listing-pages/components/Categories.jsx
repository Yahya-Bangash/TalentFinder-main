'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/filterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const Categories = () => {
    const { jobList } = useSelector((state) => state.filter) || {};
    const [getCategory, setCategory] = useState(jobList.category);
    const { t } = useTranslation('jobListings');

    const dispatch = useDispatch();

    // category handler
    const categoryHandler = (e) => {
        dispatch(addCategory(e.target.value));
    };

    useEffect(() => {
        setCategory(jobList.category);
    }, [setCategory, jobList]);

    return (
        <>
            <select
                className="form-select"
                value={jobList.category}
                onChange={categoryHandler}
            >
                <option value="">{t('categories.placeholder')}</option>
                <option value="residential">{t('categories.options.residential') || "Residential"}</option>
                <option value="commercial">{t('categories.options.commercial') || "Commercial"}</option>
                <option value="industrial">{t('categories.options.industrial') || "Industrial"}</option>
                <option value="apartments">{t('categories.options.apartments') || "Apartments"}</option>
            </select>
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default Categories;
