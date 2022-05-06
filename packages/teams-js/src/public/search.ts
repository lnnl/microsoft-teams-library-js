import { sendMessageToParent } from '../internal/communication';
import { registerHandler, removeHandler } from '../internal/handlers';
import { runtime } from './runtime';

/**
 * Allows you to interact with the host search experience
 *
 * @beta
 */
export namespace search {
  /**
   * This interface contains information pertaining to the search term in the host search experience
   */
  export interface SearchQuery {
    /** The current search term in the host search experience */
    searchTerm: string;

    // may need some sort of timestamp or sequence value to
    // ensure messages are processed in correct order / combine them
    // having any sort of logic around combining messages or sorting them
    // would make sense to go into the teamsjs-sdk layer
    // timestamp: number;
  }

  export type SearchQueryHandler = (query: SearchQuery) => void;

  /**
   * Allows the caller to register for various events fired by the host search experience.
   * Calling this function will cause the host search experience to set its default scope to
   * the name of your application.
   *
   * @param onChangeHandler - This handler will be called when the user begins searching and every
   * time the user changes the contents of the query. The value of the query is the current term
   * the user is searching for. Should be used to put your application into whatever state is used
   * to handle searching. This handler will be called once with an empty {@link SearchQuery.searchTerm}
   * when search is beginning. 
   * @param onClosedHandler - This handler will be called when the user finishes searching. Should be
   * used to return your application to its default, non-search state. The value of {@link SearchQuery.searchTerm}
   * will be whatever the last query was before ending search.
   * @param onExecuteHandler - This optional handler will be called whenever the user 'executes' the
   * search (by pressing enter for example). The value of {@link SearchQuery.searchTerm} is the current 
   * term the user is searching for. Should be used if your app wants to treat executing searches differently than responding
   * to changes to the search query.
   *
   * @example
   * ``` ts
   * search.registerHandlers(
      query => {
        alert(`Update your application to render a change to the search query: ${query.searchTerm}`);
      },
      () => {
        alert('Update your application to handle the search experience being closed');
      },
      query => {
        alert(`Update your application to render an executed search result: ${query.searchTerm}`);
      },
     );
   * ```
   */
  export function registerHandlers(
    onChangeHandler: SearchQueryHandler,
    onClosedHandler: () => SearchQueryHandler,
    onExecuteHandler?: SearchQueryHandler,
  ): void {
    registerHandler('searchQueryChange', onChangeHandler);
    registerHandler('searchQueryClosed', onClosedHandler);
    if (onExecuteHandler) {
      registerHandler('searchQueryExecute', onExecuteHandler);
    }
  }

  /**
   * Allows the caller to unregister for all events fired by the host search experience. Calling
   * this function will cause your app to stop appearing in the set of search scopes in the host.s
   */
  export function unregisterHandlers(): void {
    // This should let the host know to stop making the app scope show up in the search experience
    sendMessageToParent('search.unregister');
    removeHandler('searchQueryChange');
    removeHandler('searchQueryClosed');
    removeHandler('searchQueryExecute');
  }

  export function isSupported(): boolean {
    return runtime.supports.search ? true : false;
  }
}
