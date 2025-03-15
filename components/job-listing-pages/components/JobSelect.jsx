'use client'
import { useDispatch, useSelector } from "react-redux";
import {
    addDatePosted,
    addExperienceSelect,
    addJobTypeSelect,
    addSalary,
} from "../../../features/filter/filterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

export default function JobSelect() {
    const { jobList } = useSelector((state) => state.filter);
    const { jobTypeList, datePost, experienceLavel } = useSelector(
        (state) => state.job
    );
    const { t } = useTranslation('jobListings');

    const dispatch = useDispatch();

    // job type handler
    const jobTypeHandler = (e) => {
        dispatch(addJobTypeSelect(e.target.value));
    };

    // date post handler
    const datePostHandler = (e) => {
        dispatch(addDatePosted(e.target.value));
    };

    // experience handler
    const experienceHandler = (e) => {
        dispatch(addExperienceSelect(e.target.value));
    };

    // salary handler
    const salaryHandler = (e) => {
        const data = JSON.parse(e.target.value);
        dispatch(addSalary(data));
    };

    return (
        <>
            <div className="showing-result">
                <div className="top-filters">
                    <div className="form-group">
                        <select
                            onChange={jobTypeHandler}
                            className="chosen-single form-select"
                            value={jobList?.jobTypeSelect}
                        >
                            <option value="">{t('jobTypes.title')}</option>
                            {jobTypeList?.map((item) => (
                                <option value={item.value} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End job type filter */}

                    <div className="form-group">
                        <select
                            onChange={datePostHandler}
                            className="chosen-single form-select"
                            value={jobList?.datePosted}
                        >
                            {datePost?.map((item) => (
                                <option value={item.value} key={item.id}>
                                    {item.value === "all" ? t('datePosted.all') :
                                     item.value === "last-hour" ? t('datePosted.lastHour') :
                                     item.value === "last-24-hour" ? t('datePosted.last24Hour') :
                                     item.value === "last-7-days" ? t('datePosted.last7Days') :
                                     item.value === "last-14-days" ? t('datePosted.last14Days') :
                                     item.value === "last-30-days" ? t('datePosted.last30Days') : item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End date posted filter */}

                    <div className="form-group">
                        <select
                            onChange={experienceHandler}
                            className="chosen-single form-select"
                            value={jobList?.experienceSelect}
                        >
                            <option value="">{t('experience.title')}</option>
                            {experienceLavel?.map((item) => (
                                <option value={item.value} key={item.id}>
                                    {item.value === "fresh" ? t('experience.fresh') :
                                     item.value === "1-year" ? t('experience.1year') :
                                     item.value === "2-year" ? t('experience.2years') :
                                     item.value === "3-year" ? t('experience.3years') :
                                     item.value === "4-year" ? t('experience.4years') : item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* End ecperience level filter */}

                    <div className="form-group">
                        <select
                            onChange={salaryHandler}
                            className="chosen-single form-select"
                            value={JSON.stringify(jobList.salary)}
                        >
                            <option
                                value={JSON.stringify({
                                    min: 0,
                                    max: 20000,
                                })}
                            >
                                {t('salary.title')}
                            </option>
                            <option
                                value={JSON.stringify({
                                    min: 0,
                                    max: 5000,
                                })}
                            >
                                {t('salary.range1')}
                            </option>
                            <option
                                value={JSON.stringify({
                                    min: 5000,
                                    max: 10000,
                                })}
                            >
                                {t('salary.range2')}
                            </option>
                            <option
                                value={JSON.stringify({
                                    min: 10000,
                                    max: 15000,
                                })}
                            >
                                {t('salary.range3')}
                            </option>
                            <option
                                value={JSON.stringify({
                                    min: 15000,
                                    max: 20000,
                                })}
                            >
                                {t('salary.range4')}
                            </option>
                        </select>
                    </div>
                    {/* End salary estimate filter */}
                </div>
            </div>
        </>
    );
}
