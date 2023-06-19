for i in `lotus client list-retrievals | grep DealStatusWaitForAcceptance -A 0 | awk '{print $2}'`                                                                   
do                
 lotus client cancel-retrieval --deal-id ${i}
done