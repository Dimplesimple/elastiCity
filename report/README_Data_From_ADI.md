# Information on Data (from Adi)
==================================

## Using Google API (Knowledge Graph aka Freebase)
==================================

## Query to be passed 

###Country
    e.g United Kingdom

    Output: JSON
        >Then the output will have JSON containing these values http://www.freebase.com/location/country
    _NOTE_ 
        I decided to augument the Country Data with the CIA World Factbook data. This has been known to be more authentic and available for all countries (see ./filter_country.py for details)
    
###Country:Field
    If specific details are required like, say *Currency*, then query must be:
    e.g *London:Currency*
        For complete list of the fields, see http://www.freebase.com/location/country

###City
    e.g London
    Output: JSON
        >e.g of the output https://www.googleapis.com/freebase/v1/topic/en/london?filter=%2Flocation
            For complete list of the fields see this http://www.freebase.com/location/citytown

        _NOTE_
        This also provides the properties like what it contains (regions inside) and in what it is contained (regions on higher heirarchy)

    Currently I am planning to staticaly support only major 719 cities, please see the file ./city_list.txt for the list (It is in City_Name,Country format)

