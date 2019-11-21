import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccessLevelDetails } from '../model/AccessLevelDetails';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccessTypes } from '../model/AccessTypes';


@Injectable()
export class AccessLevelService {
    formDigestDetail: any;

    constructor(private httpClient: HttpClient) {
    }

    updateAccess(accesslevelDetails: AccessLevelDetails) {
        let listName = "AccessLevelDetails";
        var itemType = this.getItemTypeForListName(listName);
        let option = {
            "accept": "application/json;odata=verbose",
            "contentType": "text/xml"
        };
        var item = {
            "__metadata": { "type": itemType },
            "AssociateID": accesslevelDetails.AssociateID,
            "AccessLevel": accesslevelDetails.AccessLevel
        };

        let apiURL = `https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('AccessLevelDetails')/items`;
        let methodType = "POST";
        if (accesslevelDetails.ID) {
            apiURL = `${apiURL}(${accesslevelDetails.ID})`;
            methodType = "MERGE";
        }
        var siteUrl = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/contextinfo";
        this.httpClient.post(siteUrl, option).subscribe((response: Response) => {
            this.formDigestDetail = response;
            let httpHeaders = new HttpHeaders({
                'Content-Type': 'application/json;charset=UTF-8;odata=verbose',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json;odata=verbose',
                "X-HTTP-Method": methodType,
                "If-Match": "*",
                "X-RequestDigest": this.formDigestDetail.FormDigestValue
            });
            let options = {
                headers: httpHeaders
            };
            return this.httpClient.post<any>(apiURL, JSON.stringify(item), options).subscribe(
                (response: Response) => {
                    return response;
                },
                error => {
                    console.log(error);
                });

        });
    }

    private getItemTypeForListName(name) {
        return "SP.Data." + name.charAt(0).toUpperCase() + name.slice(1) + "ListItem";
    }

    getAccessDetails(associateID: string): Observable<AccessLevelDetails> {
        var apiURL = `https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('AccessLevelDetails')/items?$filter=AssociateID eq ${associateID}`;
        return this.httpClient.get(apiURL).pipe(map((response: any) => {
            return response.value[0];
        }));
    }

    getAccessTypes(): Observable<AccessTypes[]> {
        var apiURL = `https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('AccessTypes')/items`;
        return this.httpClient.get(apiURL).pipe(map((response: any) => {
            return response.value;
        }));
    }

}