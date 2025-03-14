'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/filterSlice";
import { useTranslation } from "@/app/hooks/useTranslation";

const LocationBox = () => {
    const { jobList } = useSelector((state) => state.filter);
    const [getLocation, setLocation] = useState(jobList.location);
    const dispath = useDispatch();
    const { t } = useTranslation('jobListings');

    // location handler
    const locationHandler = (e) => {
        dispath(addLocation(e.target.value));
    };

    useEffect(() => {
        setLocation(jobList.location);
    }, [setLocation, jobList]);

    return (
        <>
            <input
                type="text"
                name="listing-search"
                placeholder={t('locationBox.placeholder')}
                value={getLocation}
                onChange={locationHandler}
            />
            <span className="icon flaticon-map-locator"></span>
        </>
    );
};

export default LocationBox;
