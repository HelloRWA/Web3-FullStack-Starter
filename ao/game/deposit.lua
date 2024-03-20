local bint = require('.bint')(256)

BetToken = 'rxl5oOyCuzrUUVB1edjrcHpcn9s9czhj4rsq4ACQGv4' -- must provid the BetToken Address, here we are $AO token
CRED = 'Sa0iBLPNyJQrwpTTG-tWLQU-1QeUAJA73DdxGGiKoJc'

-- PendingList = PendingList or {}

Handlers.add(
  "AOReceived",
  function(Msg)
    return
        Msg.Action == "Credit-Notice" and
        Msg.From == BetToken and "continue"
  end,
  function(Msg)
    return announce(Msg.Action, 'AORectived')
  end
)

function announce(event, description)
  return print(Colors.gray ..
    "Announcement: " .. Colors.red .. event .. " " .. Colors.blue .. description .. Colors.reset)
end

Handlers.add(
  "DepositTransfer",
  function(Msg)
    return
        Msg.Action == "Credit-Notice" and
        Msg.From == CRED and "continue"
  end,
  function(Msg)
    -- announce('DepositTransfer', Msg.Quantity)

    ao.send({
      Target = Msg.Sender,
      Action = "Deposit-Received",
      Data = Msg.Quantity,
    })

    print(Msg.Quantity)
    -- announce('DepositTransfer',
    --   'get ' .. Msg.Quantity / 1000 .. ' CRED, transfer ' .. betTokenAmount .. ' $AO to ' .. Msg.Sender)
    ao.send({
      Target = BetToken,
      Action = "Transfer",
      Quantity = Msg.Quantity,
      Recipient = Msg.Sender,
      Reason = 'Deposit CRED to get $AO'
    })

    -- ao.send({
    --   Target = Msg.Sender,
    --   Action = "Token-Sended",
    --   Data = Msg.Quantity,
    -- })
  end
)
