'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/candidateFilterSlice";
import categories from "../../../data/categories"; // Import categories data
import { useTranslation } from "@/app/hooks/useTranslation";

const Categories = () => {
    const { category } = useSelector((state) => state.candidateFilter) || {};
    const [selectedCategory, setSelectedCategory] = useState(category);
    const dispatch = useDispatch();
    const { t } = useTranslation('candidateListings');

    // Category handler
    const categoryHandler = (e) => {
        setSelectedCategory(e.target.value);
    };

    // Update Redux store when selected category changes
    useEffect(() => {
        dispatch(addCategory(selectedCategory));
    }, [dispatch, selectedCategory]);

    return (
        <>
            <select 
                onChange={categoryHandler} 
                value={selectedCategory || ""} 
                className="form-select"
            >
                <option value="">{t('categories.placeholder')}</option>
                {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                        {cat.label}
                    </option>
                ))}
            </select>
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default Categories;
