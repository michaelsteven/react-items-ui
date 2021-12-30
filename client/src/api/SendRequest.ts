import Cookies from "js-cookie";

async function checkStatusAndReturnJson(response: Response) {
    const json = response.json();
    if (response.status >= 200 && response.status < 300) {
      return json;
    }
    return json.then((err: { error: string }) => {
      throw err;
    });
  }
  
  type SendRequestOptions = {
    url: string;
    method: string;
    body: string;
    headers: any;
  };

  export default async function sendRequest(options: SendRequestOptions) {
    let csrftokenCookie = Cookies.get("XSRF-TOKEN");
    if(csrftokenCookie === undefined) {
      csrftokenCookie = "";
    }
    const _headers = new Headers({
      "Content-Type": "application/json",
      "Cache-Control": "No-Store",
      'XSRF-TOKEN': csrftokenCookie,
    });
  
    const defaults = { headers: _headers };
    const extendedOptions = Object.assign({}, defaults, options);
    const response = await fetch(extendedOptions.url, extendedOptions);
    return checkStatusAndReturnJson(response);
  }
  