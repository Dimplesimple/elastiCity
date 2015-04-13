# Information on Data (from Adi)
==================================

## Using Google API (Knowledge Graph aka Freebase)
==================================

# Query to be passed 
----------------------------------

*Country*
    e.g United Kingdom

    Output: JSON
        Then the output will have JSON containing these values http://www.freebase.com/location/country

    *** NOTE ***
        I decided to augument the Country Data with the CIA World Factbook data. This has been known to be more authentic and available for all countries (see ./filter_country.py for details)
    
*Country:Field*
    If specific details are required like, say *Currency*, then query must be:
        e.g **London:Currency**
    For complete list of the fields, see http://www.freebase.com/location/country

*City*
    e.g London

    Output: JSON
            e.g of the output https://www.googleapis.com/freebase/v1/topic/en/london?filter=%2Flocation
        For complete list of the fields see this http://www.freebase.com/location/citytown

        #**Import Note**
        This also provides the properties like 


