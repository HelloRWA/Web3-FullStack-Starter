-- refs && credit : https://github.com/mayurmarvel/aos-unbox
Handlers.add('inboxCount', Handlers.utils.hasMatchingTag('Action', '#Inbox'), function(msg)
  -- Assuming Inbox is an array containing the messages
  local inboxCount = #Inbox

  -- Send the inbox count as a response
  ao.send({
    Target = msg.From,
    Tags = { InboxCount = tostring(inboxCount) }
  })
end)


Handlers.add('inboxMessage', Handlers.utils.hasMatchingTag('Action', 'CheckInbox'), function(msg)
  -- Extract the index from the tags
  local index = tonumber(msg.Tags.Index)

  -- Check if the index is valid and within the range of the inbox messages
  if index and index > 0 and index <= #Inbox then
    -- Retrieve the message details based on the index
    local message = Inbox[index]

    -- Send the message details as a response
    ao.send({
      Target = msg.From,
      Tags = {
        Action = "Inbox",
        Index = tostring(index),
        MessageDetails = message
      }
    })
  else
    -- If the index is invalid or out of range, send an error message
    ao.send({
      Target = msg.From,
      Tags = { Error = "Invalid inbox message index" }
    })
  end
end)
