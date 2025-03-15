'use client'
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../../features/filter/employerFilterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const Categories = () => {
    const { category } = useSelector((state) => state.employer) || {};
    const { category: getCategory } = useSelector(
        (state) => state.employerFilter
    );
    const dispatch = useDispatch();
    const { t } = useTranslation('companyListings');

    const categoryHandler = (e) => {
        dispatch(addCategory(e.target.value));
    };
    return (
        <>
            <select
                className="form-select"
                onChange={categoryHandler}
                value={getCategory}
            >
                <option value="">{t('categories.placeholder')}</option>
                {category?.map((item) => (
                    <option value={item.value} key={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            <span className="icon flaticon-briefcase"></span>
        </>
    );
};

export default Categories;
